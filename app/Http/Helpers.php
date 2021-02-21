<?php

use App\Http\Controllers\API\APIMessagesHandlerController;
use App\Http\Controllers\API\AppNotificationController;
use App\Offer;
use App\Order;
use App\Service;
use App\ServicePrice;
use App\User;
use Illuminate\Support\Facades\DB;

if (!function_exists('__error')) {
    function __error($message, $status)
    {
        return APIMessagesHandlerController::error($message, $status);
    }
}

if (!function_exists('__success')) {
    function __success($data, $status)
    {
        return APIMessagesHandlerController::success($data, $status);
    }
}

if (!function_exists('__offerOrderWorkers')) {
    function __offerOrderWorkers($offer_id)
    {
        $workers = Offer::where('id', $offer_id)
            ->first()
            ->category()->first()
            ->workers()->get()
            ->toArray();
        return $workers;
    }
}

if (!function_exists('getOrderCategory')) {
    function getOrderCategory($order_id)
    {
         $order = Order::where('id', $order_id)->first();
       
        if ($order->offer_id != NULL) {
            $offer_id = Order::where('id', $order_id)
                ->first()->offer()->first()->id;
            $category = Offer::find($offer_id)
                ->category()->first();
        } else {
            
            $service  = Order::where('id', $order_id)->first()
                ->services()->first();
              
                if($service)
                {
                    $category = Service::find($service->id)
                        ->category()->first();

                }else{
                    $category = null;
                }
        }
        if($category != null){

            if($category->parent_id > 0) {
                $category = $category->parent()
                    ->first();
                   
            }
        }else{
            $category = null;
        }
        
     
        return $category;
    }
}

if (!function_exists('search_assoc')) {
    function search_assoc($value, $array)
    {
        $result = false;
        foreach ($array as $el) {
            if (!is_array($el)) {
                $result = $result || ($el == $value);
            } else if (in_array($value, $el)) {
                $result = $result || true;
            } else {
                $result = $result || false;
            }
        }
        return $result;
    }
}

if (!function_exists('getPriceByCountry')) {
    function getPriceByCountry($service_id, $country_id)
    {
        return ServicePrice::where([
                ['service_id', $service_id],
                ['country_id', $country_id],
            ])->first()->price ?? 0.00;

    }
}

if (!function_exists('pushFCM')) {
    function pushFCM($id, $type, $text, $notification_data)
    {
        return (new AppNotificationController())
            ->pushFCM($id, $type, $text, $notification_data);
    }
}
if (!function_exists('pushNotification')) {
    function pushNotification($id, $by, $message)
    {
        return (new AppNotificationController())
            ->pushNotification($id, $by, $message);
    }
}

if (!function_exists('automaticWorkerIndicator')) {
    function automaticWorkerIndicator()
    {
        $settings = DB::table('settings')
            ->first()->settings;
        $settings = json_decode($settings);
        return $settings->automatic_worker;
    }
}

if (!function_exists('changeLateOrderColor')) {
    function changeLateOrderColor($id)
    {
        $settings = DB::table('settings')
            ->first()->settings;
        $settings = json_decode($settings);

        $start_at   = $settings->start_at;
        $late_after = $settings->late_after;

        $order = Order::whereRaw(
            'id = \'' . $id . '\' AND status = 0 
                AND UNIX_TIMESTAMP(updated_at) - 
                    UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL ' .
            $late_after . ' HOUR)) <= 0'
        )->first();
        if ($order !== null) {
            return true;
        } else {
            return false;
        }
    }
}

if (!function_exists('changeUnverifiedWorkerColor')) {
    function changeUnverifiedWorkerColor($id)
    {
        $worker = User::where('id', $id)->first();
        return !(bool)$worker->verified;
    }
}

if (!function_exists('services_name')) {
    function services_name($id){
        $services_name = "";
        $service = Service::find($id);
        if($service){
            $services_name = $service->name_ar ;
        }
        return $services_name;
  }
}

