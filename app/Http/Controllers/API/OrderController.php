<?php

namespace App\Http\Controllers\API;

use App\Category;
use App\Setting;
use App\User;
use App\Conversation;
use App\Http\Controllers\Controller;
use App\Http\Controllers\NotificationController;
use App\NotificationType;
use App\Offer;
use App\Order;
use App\OrderNote;
use App\OrderPrice;
use App\OrderTracking;
use App\Service;
use Avatar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Storage;
use Validator;

class OrderController extends Controller
{
    public function getAllOrders()
    {
        $role = Auth::user()->role;

        if ($role === 'client') {
            $orders = Order::where([
                [$role . '_id', Auth::id()],
                ['status', '<>', self::COMPLETED],
            ])->orderBy('id', 'desc')
                ->with('worker', 'notes')->get();

            return __success($orders, 200);
        } elseif ($role === 'worker') {
            $inProgressOrders = Order::where([
                [$role . '_id', Auth::id()],
                ['status', '<>', self::PENDING],
                ['status', '<>', self::COMPLETED],
                ['status', '<>', self::CANCELED],
            ])->orderBy('id', 'desc')
                ->with('client', 'notes')->get();

            $newOrders = Order::where([
                [$role . '_id', Auth::id()],
                ['status', self::PENDING],
            ])->orderBy('id', 'desc')
                ->with('client', 'notes')->get();

            $lastOrders = Order::where([
                [$role . '_id', Auth::id()],
                ['status', self::COMPLETED],
            ])->orderBy('id', 'desc')
                ->with('client', 'notes')->get();

            return __success([
                'in_progress' => $inProgressOrders,
                'new'         => $newOrders,
                'last'        => $lastOrders,
            ], 200);
        }
    }

    public function getAllCompletedOrders()
    {
        $role  = Auth::user()->role;
        $other = ($role === 'worker')
            ? 'client'
            : 'worker';

        $orders = Order::where([
            [$role . '_id', Auth::id()],
            ['status', self::COMPLETED],
        ])->orderBy('id', 'desc')
            ->with($other, 'notes')
            ->get();

        return __success($orders, 200);
    }
       
    public function getOrderInformation(Request $request, $type = '')
    {
       // return $request->id;
        $role  = Auth::user()->role;
        $other = ($role === "worker") ? 'client': 'worker';

        $relashions = [$other, 'notes'];
        if ($type !== '') {
            $relashions[] = $type;
        }

        $order = Order::with($relashions)
            ->where('id', $request->id)->first();

        return __success($order, 200);
    }
    
    public function getOrderDetails($id, $type = '')
    {
        $role  = Auth::user()->role;
        $other = ($role === "worker") ? 'client': 'worker';

        $relashions = [$other, 'notes'];
        if ($type !== '') {
            $relashions[] = $type;
        }

        $order = Order::with($relashions)
            ->where('id', $id)->get();

        return __success($order, 200);
    }
    

    public function generateOrderNo()
    {
        $order   = DB::table('orders')
            ->orderBy('id', 'desc')
            ->first();
        $orderNo = ($order !== null)
            ? $order->order_no + 1
            : 100;
        return $orderNo;
    }

    public function createNewOrder(Request $request)
    {

        #TODO: Service's pattern should be ( parent:{id:q,id:q}+parent:{id:q,id:q} )
        $validator = Validator::make($request->all(), [
            'issue'          => 'string',
            'address'        => 'required|string',
            'latitude'       => 'required|string',
            'longitude'      => 'required|string',
            'day'            => 'required|string',
            'time'           => 'required|string',
            'payment_method' => 'required|string',
            'services'       => 'string',
        ]);

        if ($validator->fails()) {
            return __error($validator->errors()->all()[0], 200);
        }
        
        if(Auth::user()->verified == 1){

        $services = preg_split('/(\+)/', $request->services);
        
            $orders=[];
            foreach ($services as $service) {
                # Worker selector for order
                try {
                    $category = preg_split('/(:{)/', $service)[0];
                    $category = Category::find($category);
    
                    if ($category !== null) {
                       // $category = $category->first();
    
                        if ($category->parent_id > 0) {
                            $workers = $category->parent()->first()
                                ->workers()->get();

                            
                        } else {
                            $workers = $category->workers()->get();
                        }
                    }
    
                    if (count($workers) > 0) {
                        $distances = [];
                        foreach ($workers as $k => $v) {
                            if ($v->country_id == Auth::user()->country_id) {
                                $x                 = (float)$v->latitude - (float)$request->latitude;
                                $y                 = (float)$v->longitude - (float)$request->longitude;
                                $distance          = sqrt(($x ** 2) + ($y ** 2));
                                $distances[$v->id] = $distance;
                            }else {
                                $worker_id = null;

                            }
                           
                        }
                        asort($distances);
    
                        $workers   = array_values(array_keys($distances));
                        $worker_id = $workers[0];
                    } else {
                        $worker_id = null;
                    }
                } catch (\Exception $e) {
                    //
                }
    
                $settings = Setting::orderBy('id', 'desc')->first()->settings;
                
                $settings         = json_decode($settings);
                $automatic_worker = $settings->automatic_worker;
                if ((bool)$automatic_worker === false) {
                    $worker_id = null;
                }
    
                # Add New Order!
                    $order_id = $this->addNewOrder($request, $worker_id);
                //////////////////////
               
    
                # Add services related to order!
                $_services = preg_match('/{(.*?)}/', $service, $matches);
                $servs     = $matches[1];
                $total_price = 0; 
                $_services   = explode(',', $servs);
                
                    
                        foreach ($_services as $k => $v) {
    
                            $d = explode(':', $v);
                            
                            $s = Service::find($d[0]);
                            if($s !== null) {
                                foreach($s->prices as $p)
                                {
                                    if ($p->country_id == Auth::user()->country_id) {
                                        $price = (float)$p->price * (float)$d[1];
                                    }
                                }
            
                                DB::table('order_services')->insert([
                                    'order_id'   => $order_id,
                                    'service_id' => (int)$d[0],
                                    'quantity'   => (float)$d[1],
                                    'price'      => $price
                                ]);
                                
                                    $total_price+=$price;
                                
                            }
                                
                                     
                        }
                                    
                    
                            
                        $this->changeOrderTotalPrice($order_id, $total_price);
                        $orders[] = $order_id;
                    
    
                    
     
                            
    
            
            }
            // Return Created Orders!
            $orders = Order::whereIn('id', $orders)->get();
        

    
    

        return __success($orders, 200);
    }else{
        return __error(trans('api.unauthorized'), 200);

    }
    }


    protected function changeOrderTotalPrice($order_id, $total_price)
    {
        $order = Order::where( 'id',$order_id )->first();

        $order->total_price = round($total_price, 2);
        $order->save();

        (new NotificationController())
            ->pushNotification(
                $order->id,
                '# ' . $order->order_no,
                $order->total_price,
                'order'
            );
    }

    protected function addNewOrder($request, $worker_id)
    {
        $cod = ($request->payment_method === 'cod') ? true : false;
            $country_id = Auth::user()->country()->first()->id;
            $order      = new Order([
                'issue'       => $request->issue ?: '',
                'address'     => $request->address,
                'latitude'    => $request->latitude,
                'longitude'   => $request->longitude,
                'day'         => $request->day,
                'time'        => $request->time,
                'client_id'   => Auth::id(),
                'worker_id'   => $worker_id,
                'total_price' => 0,
                'cod'         => $cod,
                'order_no'    => $this->generateOrderNo(),
                'country_id'  => $country_id,
            ]);
    
            $order->save();
        

 

        if ($request->file('attachment')) {
            $attachment          = $request->file('attachment');
            $attachment_fileName = uniqid() . '.' . $attachment->getClientOriginalExtension();
            Storage::disk('uploads')
                ->putFileAs('orders/' . $order->id, $attachment, $attachment_fileName);

            $order->attachment = $attachment_fileName;
            $order->save();
        }

        $newState = new OrderTracking([
            'status'   => self::BOUGHT,
            'order_id' => $order->id,
            'user_id'  => Auth::id(),
        ]);
        $newState->save();

        if ($order->worker_id !== null) {
            $this->startNewConversation(
                $order->client_id, $order->worker_id, $order->id
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
        
        return $order->id;
    }

    public function startNewConversation(
        $user_one, $user_two, $order_id)
    {
        $conversation = new Conversation([
            'user_one' => $user_one,
            'user_two' => $user_two,
            'order_id' => $order_id,
        ]);
        $conversation->save();
    }

    public function changeOrderStatus(Request $request)
    {
        $id    = $request->order_id;
        $order = Order::where(
            'id', $id
        )->first();

        $notes = $order->notes()
            ->where('status', 0)
            ->get();
        if (count($notes) > 0) {
            return __error(trans('api.notes_remains'), 200);
        }

        $status = $request->order_state;

        $state = [
            'pending'  => self::PENDING,
            'accept'   => self::ACCEPTED,
            'arrive'   => self::ARRIVED,
            'paid'     => self::PRICE_VALIDATION,
            'start'    => self::STARTED,
            'check'    => self::CHECKING,
            'complete' => self::COMPLETED,
            'cancel'   => self::CANCELED,
        ];

        if ($status === 'cancel') {
            $validator = Validator::make($request->all(), [
                'cancellation_note' => 'required|string',
            ]);

            if ($validator->fails()) {
                return __error($validator->errors()->all()[0], 200);
            }

            $this->cancelOrder($request);
        }

        if (isset($state[$status])) {
            $order->status = $state[$status];

            if (($order->cod === 0)
                && ($status === 'arrive')
            ) {
                $notes = $order->notes()
                    ->where('status', 0)
                    ->get();
                if (count($notes) > 0) {
                    $order->status = self::ARRIVED;
                } else {
                    $order->status = self::PRICE_VALIDATION;
                }
            }

            $order->save();

            // $state_arr = [
            //     self::ACCEPTED,
            //     self::COMPLETED,
            //     self::CANCELED,
            // ];
             $state_arr = [
                self::ACCEPTED,
                self::ARRIVED,
                self::PRICE_VALIDATION,
                self::STARTED,
                self::CHECKING,
                self::COMPLETED,
                self::CANCELED,
            ];

            if ($order->client_id !== null
                && in_array($order->status,
                    $state_arr, false)) {
                        
                        
                         $language = Auth::user()->language;
                        if ($language == 'arabic') {
                            $message = NotificationType::where('type',  'order_' . $status)
                                ->first()->message_ar;
                        } else if ($language == 'english') {
                            $message  = NotificationType::where('type',  'order_' . $status)
                                ->first()->message_en;
                        } else {
                            $message  = NotificationType::where('type',  'order_' . $status)
                                ->first()->message;
                        }
                $message = str_replace('{order_no}', '#' . $order->order_no, $message);


                pushNotification($order->client_id, $order->worker_id, $message);
                pushFCM($order->client_id, 'order', $message, ['orderId', $order->id]);
            }
        } else {
            return __error(trans('api.unknown_status'), 200);
        }

        if ($status === 'cancel') {
            $newState = new OrderTracking([
                'status'   => self::CANCELED,
                'order_id' => $order->id,
                'user_id'  => Auth::id(),
                'note'     => $request->cancellation_note,
            ]);

            $newState->save();
        } else {
            $newState = new OrderTracking([
                'status'   => $order->status,
                'order_id' => $order->id,
                'user_id'  => Auth::id(),
            ]);

            $newState->save();
        }

        return $this->getAllOrders();
    }

    public function cancelOrder(Request $request)
    {  
        $order = Order::where('id',$request->order_id)->first();

        DB::table('excluded_workers')->insert([
            'order_id'  => $order->id,
            'worker_id' => $order->worker_id,
        ]);
          
        if ($order->offer_id !== null) {
            $service = $order->offer()->first();
            $service = Offer::where(
                'id',
                $service->id
            )->first();
        } else {
            $service = $order->services()->first();
            $service = Service::where(
                'id',
                $service->id
            )->first();
        }

        $excluded_workers = DB::table('excluded_workers')
            ->where('order_id', $request->order_id)
            ->first();
        
        // $excluded_workers = (count($excluded_workers) > 0)
        //     ? $excluded_workers = array_column($excluded_workers, 'worker_id')
        //     : [0];

            



        $category = $service->category();
        if ($category->first()->parent_id != null) {
            $workers = $category->first()
                ->parent()->first()
                ->workers()
                ->where('id', '!=',$excluded_workers->worker_id)
                ->get();

        } else {
          
            $workers = $category->first()
                ->workers()
                ->where('id', '!=',$excluded_workers->worker_id)
                ->get();
                
            }
            
            $latitude  = $order->latitude;
            $longitude = $order->longitude;
            
            $distances = [];
            foreach ($workers as $k => $v) {
                $x                 = (float)$v->latitude - (float)$latitude;
                $y                 = (float)$v->longitude - (float)$longitude;
                $distance          = sqrt(($x ** 2) + ($y ** 2));
                $distances[$v->id] = $distance;
                
            }
            
            asort($distances);
            $workers = array_values(array_keys($distances));
            
            if (isset($workers[0])) {
                $worker_id = $workers[0];
            } else {
                $worker_id = null;
            }
            //$order->worker_id = null;
            $order->status    = self::PENDING;
            
            /*      if ($worker_id !== null) {
            } */
            
            $order->update(['worker_id' => $worker_id,
            'status' => 0 ,
            
            
            ]);
            
           

        if ($order->worker_id !== null) {
                //$language = Auth::user()->language;
                $lang = User::where('id',$order->worker_id)->first();
                $language = $lang->language;
                if ($language == 'arabic') {
                    $message = NotificationType::where('type',  'new_order')
                        ->first()->message_ar;
                } else if ($language == 'english') {
                    $message  = NotificationType::where('type',  'new_order')
                        ->first()->message_en;
                } else {
                    $message  = NotificationType::where('type',  'new_order')
                        ->first()->message;
                }
            $message = str_replace('{order_no}', '#' . $order->order_no, $message);

            pushNotification($order->worker_id, $order->client_id, $message);
            pushFCM($order->worker_id, 'order', $message, ['orderId', $order->id]);
        }

        $newState = new OrderTracking([
            'status'   => self::CANCELED,
            'order_id' => $order->id,
            'user_id'  => Auth::id(),
            'note'     => $request->cancellation_note,
        ]);

        $newState->save();

        // $this->startNewConversation(
        // $order->client_id, $order->worker_id, $order->id
        // );

        return $this->getAllOrders();
    }

    public function createOrderNote(Request $request)
    {
        $id      = $request->order_id;
        $service = explode(',', $request->services);

        foreach ($service as $serv) {
            $s = explode(':', $serv);
            try {
                DB::table('order_notes')->insert([
                    'service'  => $s[0],
                    'quantity' => $s[1],
                    'price'    => $s[2],
                    'order_id' => $id,
                    'status'   => false
                ]);
            } catch (\Exception $e) {
                //
            }
        }

        $order = Order::where('id', $id)->first();
        if ($order->client_id !== null) {
            //$language = Auth::user()->language;
            $lang = User::where('id',$order->client_id)->first();
            $language = $lang->language;
            if ($language == 'arabic') {
                $message = NotificationType::where('type', 'order_note')
                    ->first()->message_ar;
            } else if ($language == 'english') {
                $message  = NotificationType::where('type', 'order_note')
                    ->first()->message_en;
            } else {
                $message  = NotificationType::where('type', 'order_note')
                    ->first()->message;
            }

            $message = str_replace('{order_no}', '#' . $order->order_no, $message);

            pushNotification($order->client_id, $order->worker_id, $message);
            pushFCM($order->client_id, 'order', $message, ['orderId', $order->id]);

            if ($order->status >= self::ARRIVED) {
                $order->status = self::ARRIVED;
                $order->save();
            }
        }

        return $this->getOrderDetails($id);
    }

    public function acceptOrderNotes(Request $request)
    {
        # $request->state: {0=Pending, 1=Accepted, -1=Declined}
        $id   = $request->order_id;
        $note = $request->note_id;

        if ($note === 'all') {
            $notes = OrderNote::where([
                ['order_id', $id],
                ['status', 0],
            ]);
            $state = 1;
        } else {
            $notes = OrderNote::where([
                ['id', $note],
                ['order_id', $id],
            ]);
            $state = $request->state;
        }

        $additional_price = (float)$notes->sum('price') * (float)$notes->sum('quantity');

        $notes->update(['status' => $state]);

        if ((int)$state === 1) {
            Order::where('id', $id)
                ->increment(
                    'total_price',
                    $additional_price
                );
        }

        $role  = Auth::user()->role;
        $other = ($role === 'worker')
            ? 'client' : 'worker';

        $order = Order::with($other, 'notes')
            ->where('id', $id)->first();

        if ($order->worker_id !== null) {
            $type = ((int)$state === 1)
                ? 'accept_order_note'
                : 'decline_order_note'; 
                //$language = Auth::user()->language;
                $lang = User::where('id',$order->worker_id)->first();
                $language = $lang->language;
                if ($language == 'arabic') {
                    $message = NotificationType::where('type', $type)
                        ->first()->message_ar;
                } else if ($language == 'english') {
                    $message  = NotificationType::where('type', $type)
                        ->first()->message_en;
                } else {
                    $message  = NotificationType::where('type', $type)
                        ->first()->message;
                }

            $message = str_replace('{order_no}', '#' . $order->order_no, $message);

            pushNotification($order->worker_id, $order->client_id, $message);
            pushFCM($order->worker_id, 'order', $message, ['orderId', $order->id]);
        }
        return $this->getAllOrders();
    }




    public function cancelOrderFromWeb(Request $request){
        $order = Order::where('id',$request->order_id)->first();

       
       

        DB::table('excluded_workers')->insert([
            'order_id'  => $order->id,
            'worker_id' => $order->worker_id,
        ]);
          
        if ($order->offer_id !== null) {
            $service = $order->offer()->first();
            $service = Offer::where(
                'id',
                $service->id
            )->first();
        } else {
            $service = $order->services()->first();
            $service = Service::where(
                'id',
                $service->id
            )->first();
        }

        $excluded_workers = DB::table('excluded_workers')
            ->where('order_id', $request->order_id)
            ->first();
        
        // $excluded_workers = (count($excluded_workers) > 0)
        //     ? $excluded_workers = array_column($excluded_workers, 'worker_id')
        //     : [0];

            



        $category = $service->category();
        if ($category->first()->parent_id != null) {
            $workers = $category->first()
                ->parent()->first()
                ->workers()
                ->where('id', '!=',$excluded_workers->worker_id)
                ->get();

        } else {
          
            $workers = $category->first()
                ->workers()
                ->where('id', '!=',$excluded_workers->worker_id)
                ->get();
                
            }
            
            $latitude  = $order->latitude;
            $longitude = $order->longitude;
            
            $distances = [];
            foreach ($workers as $k => $v) {
                $x                 = (float)$v->latitude - (float)$latitude;
                $y                 = (float)$v->longitude - (float)$longitude;
                $distance          = sqrt(($x ** 2) + ($y ** 2));
                $distances[$v->id] = $distance;
                
            }
            
            asort($distances);
            $workers = array_values(array_keys($distances));
            
            if (isset($workers[0])) {
                $worker_id = $workers[0];
            } else {
                $worker_id = null;
            }
            //$order->worker_id = null;
            $order->status    = self::PENDING;
            
            /*      if ($worker_id !== null) {
            } */
            
            $order->update(['worker_id' => $worker_id,
            'status' => 0 ,
            
            
            ]);
            
           

        if ($order->worker_id !== null) {
                //$language = Auth::user()->language;
                $lang = User::where('id',$order->worker_id)->first();
                $language = $lang->language;
                if ($language == 'arabic') {
                    $message = NotificationType::where('type',  'new_order')
                        ->first()->message_ar;
                } else if ($language == 'english') {
                    $message  = NotificationType::where('type',  'new_order')
                        ->first()->message_en;
                } else {
                    $message  = NotificationType::where('type',  'new_order')
                        ->first()->message;
                }
            $message = str_replace('{order_no}', '#' . $order->order_no, $message);

            pushNotification($order->worker_id, $order->client_id, $message);
            pushFCM($order->worker_id, 'order', $message, ['orderId', $order->id]);
        }

        Validator::make($request->all(), [
            'cancellation_note' => 'required|string',
        ]);


        $newState = new OrderTracking([
            'status'   => self::CANCELED,
            'order_id' => $order->id,
            'user_id'  => Auth::id(),
            'note'     => $request->cancellation_note,
        ]);

        $newState->save();

      
        return redirect('https://homefix-website.za3bot.com/dashboard');


    }



     public function pushNotificationFromWeb(Request $request){

         $lang = User::where('id',$request->worker_id)->first();
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
          $message = str_replace('{order_no}', '#' . $request->order_no, $msg);

          pushNotification($request->worker_id, $request->client_id, $message);
/*           pushFCM($request->worker_id, 'order', $message, ['orderId', $request->order_id]);
 */ 
         /*  (new NotificationController())
          ->pushNotification(
            $request->order_id,
              '# ' . $request->order_no,
              $message,
              'order'
          );
 */
          return response()->json($request->all(),200);

     }
}
