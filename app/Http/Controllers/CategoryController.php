<?php

namespace App\Http\Controllers;

use App\Category;
use App\Country;
use App\NotificationType;
use App\Service;
use App\ServicePrice;
use App\User;
use Avatar;
use File;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Storage;

class CategoryController extends Controller
{
    protected $mainTitle;
    protected $flatIconsAPI;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin']);

        $this->mainTitle    = trans('admin.category_management');
        $this->flatIconsAPI = env('FLATICON_API');
    }

    /**
     * Display a listing of the category.
     *
     * @return Response
     */
    public function index()
    {
        $countries = Country::where(
            'status', true
        )->get();

        return view('categories.list', [
            'mainTitle'  => $this->mainTitle,
            'title'      => $this->mainTitle,
            'countries'  => $countries,
            'categories' => Category::where([
                ['parent_id', null]
            ])->with('subCategories', 'quick')->get(),
        ]);
    }

    /**
     * Show the form for creating a new category.
     *
     * @return Response
     */
    public function create()
    {
        $countries = Country::where(
            'status', true
        )->get();

        return view('categories.add', [
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.add_category'),
            'countries'  => $countries,
            'categories' => Category::where([
                ['status', true],
                ['parent_id', null]
            ])->get(),
        ]);
    }

    /**
     * Store a newly created category in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name_en' => 'required|string',
            'name_ar' => 'required|string',
            'name_tr' => 'required|string',
            'price.*' => 'required|numeric',
        ]);

        if (!$request->file('upload_icon') && !$request->icon) {
            $request->validate([
                'icon' => 'required',
            ]);
        }

        if ($request->parent > 0) {
            $request->validate([
                'parent' => 'required|numeric',
            ]);
            $additional = [
                'parent_id' => $request->parent,
            ];
        } else {
            $additional = [];
        }

        $params = array_merge($additional, [
            'name_en' => $request->name_en,
            'name_ar' => $request->name_ar,
            'name_tr' => $request->name_tr,
        ]);

        $category = new Category($params);
        $category->save();

        if ($request->parent > 0) {
            $conditions = [
                ['category_id', $category->id],
                ['checkup', true],
            ];
            $params     = [
                'name_en'     => 'Checkup ( ' . $request->name_en . ' )',
                'name_ar'     => 'الفحص الشامل ( ' . $request->name_ar . ' )',
                'name_tr'     => 'Kontrol Etmek ( ' . $request->name_tr . ' )',
                'price'       => 0.00,
                'category_id' => $category->id,
                'checkup'     => true,
            ];
        } else {
            $conditions = [
                ['category_id', $category->id],
                ['quick', true],
            ];
            $params     = [
                'name_en'     => 'Quick Order ( ' . $request->name_en . ' )',
                'name_ar'     => 'الطلب السريع ( ' . $request->name_ar . ' )',
                'name_tr'     => 'Hızlı Sipariş ( ' . $request->name_tr . ' )',
                'price'       => 0.00,
                'category_id' => $category->id,
                'quick'       => true,
            ];
        }

        // Delete Old Records
        Service::where($conditions)
            ->delete();

        // Add New Record
        $service = new Service($params);
        $service->save();

        if ($request->file('upload_icon')) {
            $icon = $request->file('upload_icon');
            Storage::disk('uploads')
                ->putFileAs('images/categories/' . $category->id, $icon, 'icon.png');
        } else {
            ini_set('max_execution_time', 0);

            $path = base_path(Storage::disk('uploads')->url('images/categories/' . $category->id));
            @File::makeDirectory($path);

            $icon = file_get_contents($request->icon,
                false, stream_context_create([
                    'ssl' => [
                        'verify_peer'      => false,
                        'verify_peer_name' => false,
                    ]
                ]));

            @file_put_contents($path . '/icon.png', $icon);
        }

        $users   = User::whereIn('role', ['worker', 'client'])->get();
        $message = NotificationType::where('type', 'new_category')
            ->first()->message;
        $message = str_replace('{category_name}', '( ' . $category->name_ar . ' )', $message);

        foreach ($users as $user) {
            pushNotification($user->id, Auth::id(), $message);
            pushFCM($user->id, 'category', $message, ['categoryId', $category->id]);
        }

        foreach ((array)$request->price as $k => $v) {
            $price = new ServicePrice([
                'service_id' => $service->id,
                'country_id' => (int)$k,
                'price'      => round((double)$v, 2)
            ]);
            $price->save();
        }

        $request->session()->flash('success',
            trans('admin.category_added'));
        return redirect()->route('categories.index');
    }

    /**
     * Display the specified category.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $countries = Country::where(
            'status', true
        )->get();

        $category = Category::where([
            ['id', $id],
            ['parent_id', null],
        ])->with([
            'quick', 'offers',
            'subCategories.services'
        ])->first();

        if ($category !== null) {
            return view('categories.view', [
                'countries' => $countries,
                'category'  => $category,
                'mainTitle' => $this->mainTitle,
                'title'     => trans('admin.view_category') . ' ( ' . $category->name . ' )',
            ]);
        }

        return $this->_404(
            trans('admin.category_notfound'),
            $this->mainTitle, 'categories.index'
        );
    }

    /**
     * Show the form for editing the specified category.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        $countries = Country::where(
            'status', true
        )->get();

        $category = Category::where([
            ['id', $id],
            ['parent_id', null]
        ])->with('quick')
            ->first();

        if ($category !== null) {
            return view('categories.edit', [
                'category'  => $category,
                'countries' => $countries,
                'mainTitle' => $this->mainTitle,
                'title'     => trans('admin.edit_category') . ' ( ' . $category->id . ' )',
            ]);
        }
        return $this->_404(
            trans('admin.category_notfound'),
            $this->mainTitle, 'categories.index'
        );
    }

    /**
     * Update the specified category in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name_en' => 'required|string',
            'name_ar' => 'required|string',
            'name_tr' => 'required|string',
            'status'  => 'required',
            'price.*' => 'required|numeric',
        ]);

        $category = Category::find($id);

        $category->name_en = $request->name_en;
        $category->name_ar = $request->name_ar;
        $category->name_tr = $request->name_tr;
        $category->status  = $request->status;

        $category->save();

        $service_id = $category->quick()->first()->id;
        ServicePrice::where(
            'service_id', $service_id
        )->delete();

        foreach ((array)$request->price as $k => $v) {
            $price = new ServicePrice([
                'service_id' => $service_id,
                'country_id' => (int)$k,
                'price'      => round((double)$v, 2)
            ]);
            $price->save();
        }

        if ($request->file('upload_icon')) {
            $icon = $request->file('upload_icon');
            Storage::disk('uploads')
                ->putFileAs('images/categories/' . $category->id, $icon, 'icon.png');
        } elseif ($request->icon) {
            ini_set('max_execution_time', 0);

            $path = base_path(Storage::disk('uploads')
                ->url('images/categories/' . $category->id));

            @File::makeDirectory($path);

            $icon = file_get_contents($request->icon,
                false, stream_context_create([
                    'ssl' => [
                        'verify_peer'      => false,
                        'verify_peer_name' => false,
                    ]
                ]));

            @file_put_contents($path . '/icon.png', $icon);
        }

        $request->session()->flash('success',
            trans('admin.category_updated'));
        return redirect()->route('categories.index');
    }

    /**
     * Remove the specified category from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        if (Category::find($id)->delete()) {
            return response()->json('success', 200);
        }
    }

    /**
     * Active / Deactivate the specified category.
     *
     * @param int $id
     * @return Response
     */
    public function active($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json('error', 200);
        }

        $category->status = !$category->status;
        if ($category->save()) {
            return response()->json('success', 200);
        }
    }

    public function flatIcons(Request $request)
    {
        $query  = $request->query('q');
        $client = new Client();

        $url         = 'https://api.flaticon.com/v2/app/authentication';
        $form_params = [
            'apikey' => $this->flatIconsAPI
        ];
        $headers     = [
            'Content-Type'     => 'application/x-www-form-urlencoded',
            'X-Requested-With' => 'XMLHttpRequest',
            'Accept'           => 'application/json',
        ];
        $response    = $client->request('POST', $url, [
            'form_params' => $form_params,
            'headers'     => $headers,
            'verify'      => false
        ]);

        $token = json_decode($response->getBody())->data->token;

        $url      = 'https://api.flaticon.com/v2/search/icons?q=' . $query . '&order_by=2&color=2&limit=60';
        $headers  = [
            'Accept'        => 'application/json',
            'Authorization' => 'Bearer ' . $token
        ];
        $response = $client->request('GET', $url, [
            'headers' => $headers,
            'verify'  => false
        ]);

        return $response->getBody()
            ->getContents();
    }

}
