<?php

namespace App\Http\Controllers;

use App\Notifications\OrderNotification;
use App\User;
use Illuminate\Support\Facades\Auth;
use Notification;

class NotificationController extends Controller
{
    public function pushNotification($orderId, $orderNo, $price, $type)
    {
        $users = User::where([
            ['role', '<>', 'worker'],
            ['role', '<>', 'client'],
        ])->get();

        $data = [
            'orderId'  => $orderId,
            'order_no' => $orderNo,
            'price'    => $price,
            'time'     => $this->time,
            'type'     => $type,
        ];

        foreach ($users as $user) {
            Notification::send($user, new OrderNotification($data));
        }
    }

    public function changeAllNotificationsStatus()
    {
        $user = User::find(Auth::id());
        foreach ($user->notifications as $notification) {
            $notification->markAsRead();
        }
    }

    public function clearAllNotifications()
    {
        $user = User::find(Auth::id());
        $user->notifications()->delete();
    }

    public static function getNotifications()
    {
        if (Auth::check()) {
            $user                = User::find(Auth::id());
            $notificaitons       = $user->notifications;
            $readNotifications   = $user->readNotifications;
            $unreadNotifications = $user->unreadNotifications;
                
            if ($notificaitons) {
                return [
                    'notifications'       => $notificaitons,
                    'readNotifications'   => $readNotifications,
                    'unreadNotifications' => $unreadNotifications,
                ];
            }
        }
    }
}
