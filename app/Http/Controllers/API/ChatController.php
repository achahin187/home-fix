<?php

namespace App\Http\Controllers\API;

use App\Conversation;
use App\Http\Controllers\Controller;
use App\Message;
use App\NotificationType;
use App\Offer;
use App\Order;
use App\User;
use App\Service;
use Avatar;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Storage;
use Validator;

class ChatController extends Controller
{
    public function fetchMessages(Request $request)
    {
        try {
            $user_id = Auth::id();

            $conversations = Conversation::where('user_one', $user_id)
                ->orWhere('user_two', $user_id)->get();

            $messages = [];
            foreach ($conversations as $conversation) {
                $tmp = $conversation
                    ->messages()
                    ->where('status', true)
                    ->orderBy('id', 'desc')
                    ->get();

                $ord = $conversation
                    ->order()
                    ->first();

                if (in_array($ord->status, [self::COMPLETED, self::CANCELED], false)) {
                    $conversation_status = 0;
                } else {
                    $conversation_status = 1;
                }

                if ($ord->offer_id !== null) {
                    $service = $ord->offer()->first();
                    $service = Offer::where( 'id',   $service->id )->first();
                } else {
                    $service = $ord->services()->first();
                    $service = Service::where( 'id',  $service->id)->first();
                }

                $category = $service->category()->first();
                if ($category->first()->parent_id > 0) {
                    $category = $category->first()
                        ->parent()->first()->name;
                } else {
                    $category = $category->first()->name;
                }

                foreach ($tmp as $message) {
                    $message['conversation_name']   = '#' . $ord->order_no . ' ( ' . $category . ' )';
                    $message['conversation_status'] = $conversation_status;
                    $messages[]                     = $message;
                }
            }
            usort($messages, function ($a, $b) {
                return $a['id'] < $b['id'];
            });

            return __success($messages, 200);
        } catch (Exception $e) {
            return __success([], 200);
        }
    }

    public function sendMessage(Request $request)
    {
        $conversation_id = $request->conversation_id;

        //return $conversation_id;
        if ($request->file('message')) {
            $validator = Validator::make(
                $request->all(),
                ['message' => 'mimes:jpeg,jpg,png'],
                ['image' => trans('api.upload_image')]
            );

            if ($validator->fails()) {
                return __error($validator->errors()->all()[0], 200);
            }


            $message = new Message([
                'conversation_id' => $conversation_id,
                'attachment'      => true,
                'user_id'         => Auth::id(),
            ]);
            $message->save();

            $image = $request->file('message');
            Storage::disk('uploads')->putFileAs('images/attachments/' .
                Auth::id() . '/' . $conversation_id . '/' . $message->id . '/', $image, 'image.png');

            $path = Storage::disk('uploads')->url('images/attachments/' .
                Auth::id() . '/' . $conversation_id . '/' . $message->id . '/image.png');

            $message->message = $path;
            $message->save();
        } else {
            $message = new Message([
                'message'         => $request->message,
                'attachment'      => false,
                'conversation_id' => $conversation_id,
                'user_id'         => Auth::id(),
            ]);
            $message->save();
        }

        $con   = Conversation::where(
            'con_id',
            $conversation_id
        )->first();
        $order = Order::where([
            ['id', $con->order_id],
        ])->first();
        $user  = (Auth::user()->role === 'worker')
            ? $order->client_id
            : $order->worker_id;
        $by    = (Auth::user()->role === 'worker')
            ? $order->worker_id
            : $order->client_id;
        if ($order !== null) {
            //$language = Auth::user()->language ;
            $lang = User::where('id',$user)->first();
            $language = $lang->language;
            if ($language == 'arabic'){
                $msg = NotificationType::where('type', 'new_message')
                ->first()->message_ar;
            }else if ($language == 'english' ){
                $msg = NotificationType::where('type', 'new_message')
                ->first()->message_en;
            }else{
                $msg = NotificationType::where('type', 'new_message')
                ->first()->message;
            }
            $msg = str_replace('{message}', ($message->attachment === true) ? 'Image' : $message->message, $msg);

            if ($user !== null && $by !== null) {
                pushNotification($user, $by, $msg);
                pushFCM($user, 'message', $msg, ['messageId', $message->id]);
            }
        }
        return __success('message sent!', 200);
    }

    // IOS Level
    public function fetchConversations(Request $request)
    {
        $user_id = Auth::id();

        $conversations = Conversation::where('user_one', $user_id)
            ->orWhere('user_two', $user_id)->get();

        $data = [];
        foreach ($conversations as $conversation) {
            $last_message = $conversation->messages()
                ->where('status', true)
                ->orderBy('id', 'desc')
                ->first();

            $order = $conversation->order()->first();

            if (in_array($order->status, [self::COMPLETED, self::CANCELED], false)) {
                $conversation_status = 0;
            } else {
                $conversation_status = 1;
            }

            if ($order->offer_id !== null) {
                $service = $order->offer()->first();
                $service = Offer::where(
                    'id', $service->id
                )->first();
            } else {
                $service = $order->services()->first();
                $service = Service::where(
                    'id', $service->id
                )->first();
            }

            $category = $service->category()->first();
            if ($category->first()->parent_id > 0) {
                $category = $category->first()
                    ->parent()->first()->name;
            } else {
                $category = $category->first()->name;
            }

            $user_one = $conversation->user_one;
            $user_two = $conversation->user_two;

            $user_id = ((int)$user_one === (int)Auth::id())
                ? $user_two : $user_one;

            $image = Storage::disk('uploads')
                    ->url('avatars/' . $user_id .
                        '/avatar.png') . '?t=' . time();

            $sent_at                            = date('d-m-Y h:i A', strtotime($last_message['created_at']));
            $conversation['conversation_name']  = '#' . $order->order_no . ' ( ' . $category . ' )';
            $conversation['conversation_image'] = $image;
            $conversation['sent_at']            = $sent_at ?? '';
            $conversation['sent_by']            = $last_message['sender_name'] ?? '';
            if ((bool)$last_message['attachment'] === true) {
                $last_message = trans('api.attachment_message');
            } else {
                $last_message = $last_message['message'] ?? '';
            }
            $conversation['last_message']        = $last_message;
            $conversation['conversation_status'] = $conversation_status;
            $data[]                              = $conversation;
        }

        return __success($data, 200);
    }

    public function fetchConversationsById(Request $request, $id = null)
    {
        $user_id = Auth::id();

        $conversation = Conversation::where(
            'con_id', $id
        )->first();

        if (!$conversation) {
            return __error('not_found', 200);
        }

        $data     = [];
        $messages = $conversation->messages()
            ->where('status', true)
            ->get();

        $order = $conversation->order()->first();

        if (in_array($order->status, [self::COMPLETED, self::CANCELED], false)) {
            $conversation_status = 0;
        } else {
            $conversation_status = 1;
        }

        if ($order->offer_id !== null) {
            $service = $order->offer()->first();
            $service = Offer::where(
                'id', $service->id
            )->first();
        } else {
            $service = $order->services()->first();
            $service = Service::where(
                'id', $service->id
            )->first();
        }

        $category = $service->category()->first();
        if ($category->first()->parent_id > 0) {
            $category = $category->first()
                ->parent()->first()->name;
        } else {
            $category = $category->first()->name;
        }

        $user_one = $conversation->user_one;
        $user_two = $conversation->user_two;

        $user_id = ((int)$user_one === (int)Auth::id())
            ? $user_two : $user_one;

        $image = Storage::disk('uploads')
                ->url('avatars/' . $user_id .
                    '/avatar.png') . '?t=' . time();

        $conversation['conversation_name']   = '#' . $order->order_no . ' ( ' . $category . ' )';
        $conversation['conversation_image']  = $image;
        $conversation['conversation_status'] = $conversation_status;

        $conversation['messages'] = $messages;
        $data[]                   = $conversation;

        return __success($data, 200);
    }

    public function sendMessageToConversation(Request $request, $id = null)
    {
        $conversation_id = $id;
        $conversation    = Conversation::where(
            'con_id', $conversation_id
        )->first();

        if (!$conversation) {
            return __error('not_found', 200);
        }

        if ($request->file('message')) {
            $validator = Validator::make(
                $request->all(),
                ['message' => 'image'],
                ['image' => trans('api.upload_image')]
            );

            if ($validator->fails()) {
                return __error($validator->errors()->all()[0], 200);
            }

            $message = new Message([
                'conversation_id' => $conversation_id,
                'attachment'      => true,
                'user_id'         => Auth::id(),
            ]);
            $message->save();

            $image = $request->file('message');
            Storage::disk('uploads')->putFileAs('images/attachments/' .
                Auth::id() . '/' . $conversation_id . '/' . $message->id . '/', $image, 'image.png');

            $path = Storage::disk('uploads')->url('images/attachments/' .
                Auth::id() . '/' . $conversation_id . '/' . $message->id . '/image.png');

            $message->message = $path;
            $message->save();
        } else {
            $message = new Message([
                'message'         => $request->message,
                'attachment'      => false,
                'conversation_id' => $conversation_id,
                'user_id'         => Auth::id(),
            ]);
            $message->save();
        }

        $con   = Conversation::where(
            'con_id',
            $conversation_id
        )->first();
        $order = Order::where([
            ['id', $con->order_id],
        ])->first();
        $user  = (Auth::user()->role === 'worker')
            ? $order->client_id
            : $order->worker_id;
        $by    = (Auth::user()->role === 'worker')
            ? $order->worker_id
            : $order->client_id;
        if ($order !== null) {
            //$language = Auth::user()->language ;
            $lang = User::where('id',$user)->first();
            $language = $lang->language;
            if ($language == 'arabic'){
                $msg = NotificationType::where('type', 'new_message')
                ->first()->message_ar;
            }else if ($language == 'english' ){
                $msg = NotificationType::where('type', 'new_message')
                ->first()->message_en;
            }else{
                $msg = NotificationType::where('type', 'new_message')
                ->first()->message;
            }
            $msg = str_replace('{message}', ($message->attachment === true) ? 'Image' : $message->message, $msg);

            if ($user !== null && $by !== null) {
                pushNotification($user, $by, $msg);
                pushFCM($user, 'message', $msg, ['messageId', $message->id]);
            }
        }
        return __success('success', 200);
    }

}
