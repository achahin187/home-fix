<?php

namespace App\Console\Commands;

use App\Http\Controllers\API\OrderController;
use App\NotificationType;
use App\Offer;
use App\Order;
use App\OrderTracking;
use App\Service;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class WorkerLate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'worker:late';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Change worker who is late to response to order!';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $settings = DB::table('settings')
            ->first()->settings;
        $settings = json_decode($settings);

        $start_at   = $settings->start_at;
        $late_after = $settings->late_after;

        $orders = Order::whereRaw(
            'status = 0 AND UNIX_TIMESTAMP(updated_at) - 
                UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL ' .
                    $late_after . ' HOUR)) <= 0'
        )->get();
        foreach ($orders as $order) {
            if ($order->worker_id !== null) {
                $this->changeOrderWorker($order->id);
            }
        }
    }

    public function changeOrderWorker($id)
    {
        $order = Order::where(
            'id',
            $id
        )->first();

        DB::table('excluded_workers')->insert([
            'order_id'  => $order->id,
            'worker_id' => $order->workcer_id,
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
            ->where('order_id', $id)->get()->toArray();
        $excluded_workers = (count($excluded_workers) > 0)
            ? $excluded_workers = array_column($excluded_workers, 'worker_id')
            : [0];

        $category = $service->category();
        if ($category->first()->parent_id > 0) {
            $workers = $category->first()
                ->parent()->first()
                ->workers()
                ->whereNotIn('id', $excluded_workers)
                ->get();
        } else {
            $workers = $category->first()
                ->workers()
                ->whereNotIn('id', $excluded_workers)
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

        $old_worker       = $order->worker_id;
        $order->worker_id = $worker_id;
        $order->save();

        if ($order->worker_id !== null) {
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
        
        $lang = User::where('id',$order->client_id)->first();
        $language = $lang->language;
        
        if ($language == 'arabic') {
            $mesg  = NotificationType::where('type', 'late_notifiy')
                ->first()->message_ar;
        } else if ($language == 'english') {
            $mesg  = NotificationType::where('type', 'late_notifiy')
                ->first()->message_en;
        } else {
            $mesg = NotificationType::where('type', 'late_notifiy')
                ->first()->message;
        }

      
        $message = str_replace('{order_no}', '#' . $order->order_no, $mesg);

        pushNotification($old_worker, $order->client_id, $message);
        pushFCM($old_worker, 'order', $message, ['orderId', $order->id]);

        $newState = new OrderTracking([
            'status'   => 0,
            'order_id' => $order->id,
            'user_id'  => null,
            'note'     => 'Change Automatically by System.',
        ]);

        $newState->save();

        (new OrderController())
            ->startNewConversation(
                $order->client_id,
                $order->worker_id,
                $order->id
            );
    }
}
