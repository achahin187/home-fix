<?php

namespace App\Http\Controllers;

use App\Category;
use App\Country;
use App\NotificationType;
use App\Offer;
use App\Order;
use App\User;
use Avatar;
use Exception;
use File;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Storage;


class OfferController extends Controller
{
    protected $mainTitle;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin']);
        $this->mainTitle = trans('admin.offer_management');
    }

    /**
     * Display a listing of the offer.
     *
     * @return Response
     */
    public function index()
    {
        return view('offers.list', [
            'mainTitle' => $this->mainTitle,
            'title'     => $this->mainTitle,
            'offers'    => Offer::with(
                'workers', 'category'
            )->get(),
        ]);
    }

    /**
     * Show the form for creating a new offer.
     *
     * @return Response
     */
    public function create()
    {
        $categories = Category::where('parent_id', null)->get();
        $countries = Country::get();
        return view('offers.add', [
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.add_offer'),
            'categories' => $categories,
            'countries' => $countries,
        ]);
    }

    /**
     * Store a newly created offer in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name_en'        => 'required|string',
            'name_ar'        => 'required|string',
            'name_tr'        => 'required|string',
            'description_en' => 'required|string',
            'description_ar' => 'required|string',
            'description_tr' => 'required|string',
            'category'       => 'required|numeric',
            'price'          => 'required|numeric',
            'image'          => 'required',
            'end_at_date'    => 'required',
            'end_at_time'    => 'required',
            'country_id'    => 'required',
        ]);

        $time   = strtotime($request->end_at_date . $request->end_at_time);
        $end_at = date('Y-m-d H:i:s', $time);
        $offer  = new Offer([
            'name_en'        => $request->name_en,
            'name_ar'        => $request->name_ar,
            'name_tr'        => $request->name_tr,
            'description_en' => $request->description_en,
            'description_ar' => $request->description_ar,
            'description_tr' => $request->description_tr,
            'category_id'    => $request->category,
            'price'          => $request->price,
            'end_at'         => $end_at,
            'country_id'     => $request->country_id
        ]);

        $offer->save();

        /*$workers = $offer->category()
            ->first()->workers()
            ->get();

        $offer->workers()->attach($workers);*/

        if ($request->file('image')) {
            $image = $request->file('image');
            Storage::disk('uploads')
                ->putFileAs('images/offers/' .
                    $offer->id, $image, 'image.png');
        }

        $users   = User::whereIn('role', ['worker', 'client'])->get();
        $message = NotificationType::where('type', 'new_offer')
            ->first()->message;
        $message = str_replace('{offer_name}', '( ' . $offer->name_ar . ' )', $message);

        foreach ($users as $user) {
            pushNotification($user->id, Auth::id(), $message);
            pushFCM($user->id, 'offer', $message, ['offerId', $offer->id]);
        }

        $request->session()->flash('success',
            trans('admin.offer_added'));
        return redirect()->route('offers.index');
    }

    /**
     * Display the specified offer.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $_offer = Offer::where('id', $id);

        if ($_offer === null) {
            return $this->_404(
                trans('admin.offer_notfound'),
                $this->mainTitle, 'offers.index'
            );
        }

        $offer   = $_offer->with('category', 'workers')
            ->first();
        $workers = $_offer->first()
            ->category()->first()
            ->workers()->get();


        return view('offers.view', [
            'offer'     => $offer,
            'workers'   => $workers,
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.view_offer') .
                ' ( ' . $offer->name . ' )',
        ]);
    }

    /**
     * Show the form for editing the specified offer.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        $categories = Category::where('parent_id', null)->get();
        $offer      = Offer::where('id', $id)
            ->with('category')->first();

        if ($offer === null) {
            return $this->_404(
                trans('admin.offer_notfound'),
                $this->mainTitle, 'offers.index'
            );
        }

        return view('offers.edit', [
            'offer'      => $offer,
            'categories' => $categories,
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.edit_offer') . ' ( ' . $offer->id . ' )',
        ]);
    }

    /**
     * Update the specified offer in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $offer = Offer::find($id);

        $request->validate([
            'name_en'        => 'required|string',
            'name_ar'        => 'required|string',
            'name_tr'        => 'required|string',
            'description_en' => 'required|string',
            'description_ar' => 'required|string',
            'description_tr' => 'required|string',
            'category'       => 'required|numeric',
            'price'          => 'required|numeric',
            'image'          => 'image',
            'end_at_date'    => 'required',
            'end_at_time'    => 'required',
        ]);

        $time   = strtotime($request->end_at_date . $request->end_at_time);
        $end_at = date('Y-m-d H:i:s', $time);

        $offer->name_en        = $request->name_en;
        $offer->name_ar        = $request->name_ar;
        $offer->name_tr        = $request->name_tr;
        $offer->description_en = $request->description_en;
        $offer->description_ar = $request->description_ar;
        $offer->description_tr = $request->description_tr;
        $offer->category_id    = $request->category;
        $offer->price          = $request->price;
        $offer->end_at         = $end_at;

        $offer->save();

        if ($request->file('image')) {
            $image = $request->file('image');
            Storage::disk('uploads')
                ->putFileAs('images/offers/' . $offer->id,
                    $image, 'image.png');
        }

        $request->session()->flash('success',
            trans('admin.offer_updated'));
        return redirect()->route('offers.index');
    }

    /**
     * Remove the specified offer from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        if (Offer::find($id)->delete()) {
            return response()->json('success', 200);
        }
    }

    /**
     * Active / Deactivate the specified offer.
     *
     * @param int $id
     * @return Response
     */
    public function active($id)
    {
        $offer = Offer::find($id);
        if (!$offer) {
            return response()->json('error', 200);
        }
        $offer->status = ($offer->status == true)
            ? false : true;
        if ($offer->save()) {
            return response()->json('success', 200);
        }
    }

    /**
     * Display the specified offer's order.
     *
     * @param int $id
     * @return Response
     */
    public function showOfferOrder($id)
    {
        $status = [
            trans('app.PENDING'), trans('app.ACCEPTED'),
            trans('app.ARRIVED'), trans('app.PRICE_VALIDATION'),
            trans('app.STARTED'), trans('app.CHECKING'),
            trans('app.COMPLETED'), trans('app.CANCELED')
        ];

        try {
            $offer_id = Order::where('id', $id)
                ->first()->offer()->first()->id;
            $category = Offer::find($offer_id)
                ->category()->first();
            if ($category->parent_id > 0) {
                $category = $category->parent()
                    ->first()->name;
            } else {
                $category = $category->name;
            }
        } catch (Exception $e) {
            $category = '';
        }

        $order = Order::where('id', $id)
            ->with('worker', 'client', 'tracking',
                'offer', 'notes')->first();

        $workers = [];
        if ($order !== null) {
            $offer = Offer::where('id', $order->offer_id);
            if ($offer !== null) {
                $_workers = $offer->first()
                    ->workers()->get();

                $workers[$order->id] = $_workers;
            }
        }

        if (!$order) {
            return $this->_404(
                trans('admin.order_notfound'),
                $this->mainTitle, 'orders.index'
            );
        }

        return view('orders.offer', [
            'order'     => $order,
            'category'  => $category,
            'workers'   => $workers,
            'status'    => $status,
            'mainTitle' => trans('admin.offers_orders_management'),
            'title'     => trans('admin.view_order') .
                ' ( #' . $order->order_no . ' )',
        ]);
    }

    /**
     * Add a specific worker to offer.
     *
     * @param int $id
     * @return Response
     */
    public function addWorkerToOffer(Request $request, $id)
    {
        $offer = Offer::where('id', $id)->first();

        if (is_array($request->workers)) {
            $workers = [];
            foreach (array_values($request->workers) as $str) {
                $workers[] = (int)$str;
            }
            $workers = User::whereIn('id', $workers)->get();
        } else {
            $workers = $offer->workers()->get();
        }

        $offer->workers()->detach($workers);
        if (is_array($request->workers)) {
            $offer->workers()->attach($workers, ['status' => true]);
        }

        $request->session()->flash('success',
            trans('admin.offer_worker_updated'));
        return redirect()->back();
    }

    /**
     * Delete specific worker from offer.
     *
     * @param int $id
     * @return Response
     */
    public function deleteWorkerFromOffer($worker, $offer)
    {
        DB::table('offer_workers')->where([
            ['user_id', $worker],
            ['offer_id', $offer],
        ])->delete();

        return response()->json('success', 200);
    }

    /**
     * Change specific worker status in offer.
     *
     * @param int $id
     * @return Response
     */
    public function changeWorkerStatusInOffer($worker, $offer)
    {
        $status = Offer::where('id', $offer)->first()
            ->workers()->where('id', $worker)
            ->first()->status;
        $status = !$status;

        DB::table('offer_workers')->where([
            ['user_id', $worker],
            ['offer_id', $offer],
        ])->update([
            'status' => $status
        ]);

        if ($status === true) {
            $message = NotificationType::where('type', 'accept_offer')
                ->first()->message;

            $_offer  = Offer::where('id', $offer)->first();
            $message = str_replace('{offer_name}', '( ' . $_offer->name_ar . ' )', $message);

            pushNotification($worker, Auth::id(), $message);
            pushFCM($worker, 'offer', $message, ['offerId', $_offer->id]);
        }

        return response()->json('success', 200);
    }

    /**
     * Deactivate Ended Offers
     */
    protected function changeEndedOffersStatus()
    {
        $offers = Offer::whereRaw('UNIX_TIMESTAMP(end_at) - UNIX_TIMESTAMP(CURRENT_TIMESTAMP) <= 0')->get();
        foreach ($offers as $offer) {
            $offer->status = false;
            $offer->save();
        }
    }

}
