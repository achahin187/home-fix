<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Notifications\AppNotification;
use App\User;
use Illuminate\Support\Facades\Auth;
use Notification;

class AppNotificationController extends Controller
{
    public function pushNotification($id, $by, $message)
    {
        $user = User::where('id', $id)->first();
        Notification::send($user, new AppNotification($by, $message));
    }

    public function makeAllAsRead()
    {
        $user = User::where('id', Auth::id())->first();
        $user->notifications->markAsRead();
    }

    public function clearAllNotifications()
    {
        $user = User::where('id', Auth::id())->first();
        $user->notifications()->delete();
    }

    public function getNotifications()
    {
        $user = User::where('id', Auth::id())->first();

        if ($user->notifications) {
            $readNotifications   = $user->readNotifications;
            $unreadNotifications = $user->unreadNotifications;

            $readNotifications   = array_column($readNotifications->toArray(), 'data');
            $unreadNotifications = array_column($unreadNotifications->toArray(), 'data');

            $notifications = [];

            if (count($unreadNotifications) > 0) {
                foreach ($unreadNotifications as $notification) {
                    $user = User::where(
                        'id',
                        $notification['by']
                    )->first();
                    if (isset($user->role)) {
                        if (in_array($user->role, ['client', 'worker'])) {
                            $notification['user_image'] = $user->avatar;
                            $notification['user_name']  = $user->name;
                        }
                    } else {
                        $notification['user_image'] = 'public/assets/images/logo/logo.png';
                        $notification['user_name']  = 'HomeFix';
                    }

                    $notifications['unreadNotifications'][] = $notification;
                }
            } else {
                $notifications['unreadNotifications'] = [];
            }

            if (count($readNotifications) > 0) {
                foreach ($readNotifications as $notification) {
                    $user = User::where(
                        'id',
                        $notification['by']
                    )->first();

                    if (isset($user->role)) {
                        if (in_array($user->role, ['client', 'worker'])) {
                            $notification['user_image'] = $user->avatar;
                            $notification['user_name']  = $user->name;
                        }
                    } else {
                        $notification['user_image'] = 'public/assets/images/logo/logo.png';
                        $notification['user_name']  = 'HomeFix';
                    }

                    $notifications['readNotifications'][] = $notification;
                }
            } else {
                $notifications['readNotifications'] = [];
            }

            $this->makeAllAsRead();
            return __success($notifications, 200);
        }
        return null;
    }

    public function pushFCM($id, $type, $text, $notification_data)
    {
        ini_set('max_execution_time', 0);

        $user = User::where('id', $id)->first();
        if ($user->notifications_key !== null) {
            $recipients = [
                $user->notifications_key
            ];

            $data = [
                'type'                => $type,
                $notification_data[0] => $notification_data[1]
            ];

            $notification = [
                'title'        => env('APP_NAME'),
                'text'         => $text,
                'click_action' => 'MainActivity',
                'sound'        => 'true',
                'icon'         => 'logo'
            ];

            try {
                fcm()->to($recipients)
                    ->priority('normal')
                    ->data($data)
                    ->notification($notification)
                    ->send();
            } catch (\Exception $e) {
                return null;
            }
        }
    }
}
