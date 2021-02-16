<?php

namespace App\Http\Controllers;

use App\Category;
use App\Country;
use App\ServicePrice;
use Avatar;
use File;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Storage;


class SubCategoryController extends Controller
{
    protected $mainTitle;


    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin']);
        $this->mainTitle = trans('admin.category_management');
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
            ['parent_id', '<>', null],
        ])->with('checkup', 'services', 'offers')
            ->first();
        if ($category === null) {
            return $this->_404(
                trans('admin.category_notfound'),
                $this->mainTitle, 'categories.index'
            );
        }

        return view('categories.sub.view', [
            'category'  => $category,
            'countries' => $countries,
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.view_category') . ' ( ' . $category->name . ' )',
        ]);

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
            ['parent_id', '<>', null],
        ])->with('checkup')->first();

        if ($category === null) {
            return $this->_404(
                trans('admin.category_notfound'),
                $this->mainTitle, 'categories.index'
            );
        }

        return view('categories.sub.edit', [
            'countries' => $countries,
            'category'  => $category,
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.edit_category') . ' ( ' . $category->id . ' )',
        ]);

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
        $category = Category::find($id);

        $request->validate([
            'name_en' => 'required|string',
            'name_ar' => 'required|string',
            'name_tr' => 'required|string',
            'status'  => 'required',
            'price.*' => 'required|numeric',
        ]);

        $category->name_en = $request->name_en;
        $category->name_ar = $request->name_ar;
        $category->name_tr = $request->name_tr;
        $category->status  = $request->status;

        $service_id = $category->checkup()->first()->id;
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

        $category->save();

        $request->session()->flash('success',
            trans('admin.category_updated'));
        return redirect()->route(
            'categories.show', $category->parent_id);
    }
}
