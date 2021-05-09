<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Conversation;
use App\Offer;
use App\Message;

class ChatController extends Controller
{
    protected $mainTitle;
    protected $flatIconsAPI;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin|manager']);

        $this->mainTitle    = trans('admin.chat_managment');
    }

    /**
     * Display a listing of the conversations.
     *
     * @return Response
     */
    public function index()
    {
        try {
            $conversations = Conversation::where([
                ['user_one', '<>', 'null'],
                ['user_two', '<>', 'null'],
                ['order_id', '<>', 'null'],
            ])->with([
                'messages' => function ($q) {
                    $q->with('sender')
                        ->orderBy('id', 'desc');
                }, 'client', 'worker'
            ])->get();

            $_conversations = [];
            foreach ($conversations as $conversation) {
                $ord = $conversation
                    ->order()->first();

                if ($ord->offer_id !== null) {
                    $service = $ord->offer()->first();
                    $service = Offer::where(
                        'id',
                        $service->id ?? ''
                    )->first();
                } else {
                    $service = $ord->services()->first();
                    $service = Service::where(
                        'id',
                        $service->id ?? ''
                    )->first();
                }

                $category = $service->category()->first();
                if ($category->first()->parent_id > 0) {
                    $category = $category->first()
                        ->parent()->first()->name;
                } else {
                    $category = $category->first()->name;
                }

                if (in_array($ord->status, [self::COMPLETED, self::CANCELED], false)) {
                    $conversation_status = 0;
                } else {
                    $conversation_status = 1;
                }

                $conversation->conversation_name = '#' . $ord->order_no . ' ( ' . $category . ' )';
                $conversation->conversation_status = $conversation_status;
                $conversation->conversation_image = $ord->image;
                $conversation->last_message = (isset($conversation->messages[0]))
                    ? $conversation->messages[0]->message
                    : "";

                $_conversations[] = $conversation;
            }
        } catch (Exception $e) {
            $_conversations = [];
        }

        return view('conversations.list', [
            'mainTitle'     => $this->mainTitle,
            'title'         => $this->mainTitle,
            'conversations' => $_conversations,
            // 'messages'      => $_messages,
        ]);
    }
    /**
     * Display a listing of the conversations.
     *
     * @return Response
     */
    public function show($id)
    {
        try {
            $conversation = Conversation::where('con_id', $id)
                ->with('messages.sender', 'client', 'worker')->first();

            $ord = $conversation
                ->order()->first();

            if ($ord->offer_id !== null) {
                $service = $ord->offer()->first();
                $service = Offer::where(
                    'id',
                    $service->id
                )->first();
            } else {
                $service = $ord->services()->first();
                $service = Service::where(
                    'id',
                    $service->id
                )->first();
            }

            $category = $service->category()->first();
            if ($category->first()->parent_id > 0) {
                $category = $category->first()
                    ->parent()->first()->name;
            } else {
                $category = $category->first()->name;
            }

            if (in_array($ord->status, [self::COMPLETED, self::CANCELED], false)) {
                $conversation_status = 0;
            } else {
                $conversation_status = 1;
            }

            $conversation->conversation_name = '#' . $ord->order_no . ' ( ' . $category . ' )';
            $conversation->conversation_status = $conversation_status;
            $conversation->conversation_image = $ord->image;
            $conversation->last_message = (isset($conversation->messages[0]))
                ? $conversation->messages[0]->message
                : "";
        } catch (Exception $e) {
            $conversation = [];
        }
        return view('conversations.view', [
            'mainTitle'     => $this->mainTitle,
            'title'         => $this->mainTitle,
            'conversation'  => $conversation,
            // 'messages'      => $_messages,
        ]);
    }

    /**
     * Update the specified message in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update($id)
    {
        $message = Message::find($id);
        if ($message->update(['status' => !(bool) $message->status])) {
            return response()->json([
                'type'      => 'success',
                'id'        => $id,
                'status'    => (bool) $message->status
            ], 200);
        }
    }

    /**
     * Remove the specified message from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        $message = Message::find($id);
        if ($message->delete()) {
            if ((bool) $message->attachment === true) {
                @unlink(base_path($message->message));
            }
            return response()->json([
                'type' => 'success',
                'id'   => $id
            ], 200);
        }
    }

    /**
     * Create new message.
     *
     * @param int $id
     * @return Response
     */
    public function store(Request $request)
    {
        $message = new Message([
            'message'           => $request->message,
            'conversation_id'   => $request->conversation_id,
            'user_id'           => $request->user_id,
            'attachment'        => false,
            'status'            => true,
        ]);
        if ($request->message && $request->message !== '') {
            $message->save();
        }
        return redirect()->back();
    }
}
