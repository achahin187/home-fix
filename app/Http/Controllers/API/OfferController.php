<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\NotificationController;
use App\Offer;
use App\Order;
use App\OrderTracking;
use App\NotificationType;
use App\User;
use Avatar;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Storage;
use Validator;

class OfferController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

   public function getAllOffers()
    {

       try {
            if (Auth::user()->role == 'worker') {
                $currency = Auth::user();

                $offers = Offer::where(['status'=>1,'country_id'=>auth()->user()->user_country_id]);


                foreach ($offers->get() as $offer) {
                    $workers = $offer->workers()
                      ->where('user_id', Auth::id())
                  ->withPivot('status');

                    @$worker = $workers->first()->pivot->status;
                //   //  dd($workers);
                if(isset($worker)) {
                   if((int) $worker === 0) {
                          $state = -1;
                      }else{
                          $state = 1;
                       }
                    }else{
                        $state = 0;
                   }

                   $offer->join_state = $state;
                    $_offers[]         = $offer;
                 }

                 $data=[];
                 foreach($_offers as $offer){
                    $offer->setAttribute('pricebycountry',$offer->price);
                    unset($offer->price);
                     $data[]=  array_merge([ 'currency'=>$currency->user_address['currency']], $offer->toArray());
                 }

            } else {
                $currency = Auth::user();


                $_offers = Offer::where(['status'=>1,'country_id'=>auth()->user()->user_country_id])->get();
                $data=[];
                foreach($_offers as $offer){
                    $offer->setAttribute('pricebycountry',$offer->price);
                    unset($offer->price);
                    $data[]=  array_merge([ 'currency'=>$currency->user_address['currency']], $offer->toArray());

                }

            }

            return __success(
                $data, 200);
         } catch (Exception $e) {
             return __success([], 200);
         }
    }

    protected function getOrderInformations($id)
    {
        return (new OrderController())
            ->getOrderDetails($id, 'offer');
    }

    protected function generateOrderNo()
    {
        return (new OrderController())
            ->generateOrderNo();
    }

    public function orderAnOffer(Request $request)
    {

        $offer = Offer::find($request->offer_id);
        $validator = Validator::make($request->all(), [
            'issue'          => 'string',
            'address'        => 'required|string',
            'latitude'       => 'required|string',
            'longitude'      => 'required|string',
            'day'            => 'required|string',
            'time'           => 'required|string',
            'payment_method' => 'required|string',
        ]);


        if ($validator->fails()) {
            return __error($validator->errors()->all()[0], 200);
        }

        $cod = ($request->payment_method === 'cod') ? true : false;

        if(DB::table('offer_workers')->where('status','=',1)->first())
        {
            try {
                $worker_id = $this->workerSelector(
                    $request->offer_id,
                    $request->latitude,
                    $request->longitude
                );
            } catch (Exception $e) {
                $worker_id = NULL;
            }


        }

        $settings = DB::table('settings')
            ->first()->settings;
        $settings = json_decode($settings);
        $automatic_worker = $settings->automatic_worker;
        if ((bool) $automatic_worker === false) {
            $worker_id = null;
        }


     ///check client take this offer before

        $order= order::where('client_id',auth::id())->where('offer_id',$request->offer_id)->exists();
        if($order) {

         return __error(trans('api.This offer was taken before'),200);

        }else{
            ///store offer

            $order = new Order([
                'issue'       => ($request->issue) ?: "",
                'address'     => $request->address,
                'latitude'    => $request->latitude,
                'longitude'   => $request->longitude,
                'day'         => $request->day,
                'time'        => $request->time,
                'total_price' => $offer->price,
                'cod'         => $cod,
                'client_id'   => Auth::id(),
                'worker_id'   => $worker_id,
                'offer_id'    => $request->offer_id,
                'order_no'    => $this->generateOrderNo(),
                'country_id' => $offer->country_id,
            ]);

            $order->save();

        }







        $newState = new OrderTracking([
            'status'   => self::BOUGHT,
            'order_id' => $order->id,
            'user_id'  => Auth::id(),
        ]);
        $newState->save();

        if ($order->worker_id !== null) {
            (new OrderController())
                ->startNewConversation(
                    $order->client_id,
                    $order->worker_id,
                    $order->id
                );

            //$language = Auth::user()->language;
            $lang = User::where('id',$order->worker_id)->first();
            $language = $lang->language;
            if ($language == 'arabic') {
                $msg = NotificationType::where('type', 'new_order')
                    ->first()->message_ar;
            } else if ($language == 'english') {
                $msg = NotificationType::where('type', 'new_order')
                    ->first()->message_en;
            } else {
                $msg = NotificationType::where('type', 'new_order')
                    ->first()->message;
            }
            $message = str_replace('{order_no}', '#' . $order->order_no, $msg);

            pushNotification($order->worker_id, $order->client_id, $message);
            pushFCM($order->worker_id, 'order', $message, ['orderId', $order->id]);
        }

        (new NotificationController())
            ->pushNotification(
                $order->id,
                '# ' . $order->order_no,
                $order->total_price,
                'offer'
            );

        return $this->getOrderInformations($order->id);
    }

    public function workerSelector($offer_id, $lat, $lon)
    {
        $workers = Offer::find($offer_id)
            ->workers()->get();

        if (count($workers) > 0) {
            foreach ($workers as $k => $v) {
                $x                 = (float) $v->latitude - (float) $lat;
                $y                 = (float) $v->longitude - (float) $lon;
                $distance          = sqrt(($x ** 2) + ($y ** 2));
                $distances[$v->id] = $distance;
            }
            asort($distances);
            return array_keys($distances)[0];
        }

        return null;
    }

    public function joinAnOffer(Request $request)
    {
        $id = $request->offer_id;

        $offer = DB::table('offer_workers')->where([
            ['offer_id', $id],
            ['user_id', Auth::id()],
        ])->get();

        if (count($offer) === 0) {
            if (Auth::user()->role === 'worker') {
                DB::table('offer_workers')->insert([
                    'offer_id' => $id,
                    'user_id'  => Auth::id(),
                    'status'   => false,
                ]);

                (new NotificationController())
                    ->pushNotification(
                        $id,
                        0,
                        0,
                        'worker'
                    );

                return $this->getAllOffers();
            }
        } else {
            return __error(trans('api.already_subscribed'), 200);
        }
    }

    public function disjoinAnOffer(Request $request)
    {
        $id = $request->offer_id;

        $offer = DB::table('offer_workers')->where([
            ['offer_id', $id],
            ['user_id', Auth::id()],
        ])->get();

        if (count($offer) > 0) {
            if (Auth::user()->role === 'worker') {
                DB::table('offer_workers')
                    ->where([
                        ['offer_id', $id],
                        ['user_id', Auth::id()]
                    ])->delete();

                return $this->getUserOffers();
            } else {
                return __error('unauthorized', 200);
            }
        } else {
            return __error(trans('api.already_unsubscribed'), 200);
        }
    }

    /**
     * Deactivate Ended Offers
     */
    protected function changeEndedOffersStatus()
    {


           $offers = Offer::where('end_at','<=',\Carbon\Carbon::now())->get();

        if($offers){
            foreach($offers as $offer){
                $offer->update(["status"=>0]);
            }
          }

      /*  $offers = Offer::whereRaw('UNIX_TIMESTAMP(end_at) - UNIX_TIMESTAMP(CURRENT_TIMESTAMP) <= 0')->get();
        foreach ($offers as $offer) {
            $offer->status = false;
            $offer->save();
        }*/

    }


    public function getOfferDetails(Request $request)
    {


        try {

            $validator = Validator::make($request->all(), [
                'offer_id' => 'required|string',
            ]);

            if ($validator->fails()) {
                return __error($validator->errors()->all()[0], 200);
            }

            $offer = Offer::where('id', $request->offer_id)->first();


                $currency = Auth::user();


                $_offer = Offer::where(['status'=>1,'country_id'=>auth()->user()->user_country_id])->get();
                $data=[];

                    $offer->setAttribute('pricebycountry',$offer->price);
                    unset($offer->price);
                    $data[]=  array_merge([ 'currency'=>$currency->user_address['currency']], $offer->toArray());





            return __success( $data, 200);
         } catch (Exception $e) {
             return __success([], 200);
         }




    }

    public function offerNotification(Request $request){

        (new NotificationController())
        ->pushNotification(
            $request->id,
            0,
            0,
            'worker'
        );

        return response()->json($request->id,200);


    }
}
