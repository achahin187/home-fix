<?php

namespace App\Http\Controllers;

use App\NotificationType;
use App\Order;
use App\OrderNote;
use App\OrderService;
use App\OrderTracking;
use App\Service;
use App\User;
use Avatar;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Storage;
use App\ServicePrice;

class OrderController extends Controller
{
    protected $mainTitle;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin|manager']);
        $this->mainTitle = trans('admin.order_management');
    }

    /**
     * Display a listing of the order.
     *
     * @return Response
     */
    public function index()
    {
        $status = [
            trans('app.PENDING'), trans('app.ACCEPTED'),
            trans('app.ARRIVED'), trans('app.PRICE_VALIDATION'),
            trans('app.STARTED'), trans('app.CHECKING'),
            trans('app.COMPLETED'), trans('app.CANCELED'),trans('app.CLIENT_ACCEPT') ,trans('app.CLIENT_APPROVE')
        ];

        $workers = User::where([
            ['role', 'worker'],
            ['ban', false],
            ['verified', true],
        ])->get();

        $orders = Order::with('worker', 'client')
            ->orderBy('id', 'desc')->get();

        if (!$orders) {
            return $this->_404(
                trans('admin.order_notfound'),
                $this->mainTitle,
                'orders.index'
            );
        }

        $canceld_order   = Order::where([
            ['offer_id', NULL],
            ['status', self::CANCELED],
        ])->get();
        $completed_order = Order::where([
            ['offer_id', NULL],
            ['status', self::COMPLETED],
        ])->get();

        $totalOrdersPrice = array_sum(array_column($orders->toArray(), 'total_price'));
        $number           = $totalOrdersPrice;

        if ($number < 1000000) {
            // Anything less than a million
            $format = number_format($number / 1000, 2) . 'K';
        } else if ($number < 1000000000) {
            // Anything less than a billion
            $format = number_format($number / 1000000, 2) . 'M';
        } else {
            // At least a billion
            $format = number_format($number / 1000000000, 2) . 'B';
        }
        $totalOrdersPrice = $format;

        return view('orders.list', [
            'mainTitle'        => $this->mainTitle,
            'title'            => $this->mainTitle,
            'orders'           => $orders,
            'status'           => $status,
            'totalOrdersPrice' => $totalOrdersPrice,
            'canceledOrders'   => count($canceld_order),
            'completedOrders'  => count($completed_order),
            'workers'          => $workers,
        ]);
    }

    /**
     * Display a listing of the quick order.
     *
     * @return Response
     */
    public function quickIndex()
    {
        $status = [
            trans('app.PENDING'), trans('app.ACCEPTED'),
            trans('app.ARRIVED'), trans('app.PRICE_VALIDATION'),
            trans('app.STARTED'), trans('app.CHECKING'),
            trans('app.COMPLETED'), trans('app.CANCELED'),trans('app.CLIENT_ACCEPT') ,trans('app.CLIENT_APPROVE')
        ];

        $workers = User::where([
            ['role', 'worker'],
            ['ban', false],
            ['verified', true],
        ])->get();

        $orders = Order::whereHas('services')
            ->with(['worker', 'client',
                    'services' => function ($q) {
                        $q->where('quick', true);
                    }])->get()->toArray();
        $orders = array_filter($orders, function ($order) {
            if (count($order['services']) > 0) {
                return $order;
            }
        });

        if (!$orders) {
            return $this->_404(
                trans('admin.order_notfound'),
                $this->mainTitle,
                'orders.index'
            );
        }

        $canceld_order   = Order::where([
            ['offer_id', NULL],
            ['status', self::CANCELED],
        ])->get();
        $completed_order = Order::where([
            ['offer_id', NULL],
            ['status', self::COMPLETED],
        ])->get();

        $totalOrdersPrice = array_sum(array_column($orders, 'total_price'));

        $number = $totalOrdersPrice;

        if ($number < 1000000) {
            // Anything less than a million
            $format = number_format($number / 1000, 2) . 'K';
        } else if ($number < 1000000000) {
            // Anything less than a billion
            $format = number_format($number / 1000000, 2) . 'M';
        } else {
            // At least a billion
            $format = number_format($number / 1000000000, 2) . 'B';
        }
        $totalOrdersPrice = $format;

        return view('orders.quick', [
            'mainTitle'        => trans('admin.the_quick_orders'),
            'title'            => trans('admin.the_quick_orders'),
            'orders'           => $orders,
            'status'           => $status,
            'totalOrdersPrice' => $totalOrdersPrice,
            'canceledOrders'   => count($canceld_order),
            'completedOrders'  => count($completed_order),
            'workers'          => $workers,
        ]);
    }

    /**
     * Display the specified order.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $status = [
            trans('app.PENDING'), trans('app.ACCEPTED'),
            trans('app.ARRIVED'), trans('app.PRICE_VALIDATION'),
            trans('app.STARTED'), trans('app.CHECKING'),
            trans('app.COMPLETED'), trans('app.CANCELED'),trans('app.CLIENT_ACCEPT') ,trans('app.CLIENT_APPROVE')
        ];

        $order = Order::where('id', $id)
            ->with(
                'worker',
                'client',
                'offer',
                'notes',
                'tracking',
                'servicesDetails'
            )->first();
        if (!$order) {
            return $this->_404(
                trans('admin.order_notfound'),
                $this->mainTitle,
                'orders.index'
            );
        }


        $workers = User::where([
            ['role', 'worker'],
            ['ban', false],
            ['verified', true],
        ])->get();

        try {
            $service  = Order::where('id', $id)->first()
                ->services()->first()->id;
            $category = Service::find($service)
                ->category()->first();
            if ($category->parent_id > 0) {
                $category = $category->parent()
                    ->first()->name;
            } else {
                $category = $category->name;
            }
        } catch (Exception $e) {
            $category = "";
        }

        return view('orders.view', [
            'order'     => $order,
            'category'  => $category,
            'workers'   => $workers,
            'status'    => $status,
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.view_order') .
                ' ( #' . $order->order_no . ' )',
        ]);
    }

    /**
     * Show the form for editing the specified order.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        return $this->_404(
            trans('admin.404_error'),
            trans('admin.control_panel'),
            'admin'
        );
    }

    /**
     * Update the specified order in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        $request->validate([
            'day'        => 'required',
            'time'       => 'required',
            'status'     => 'required',
            'worker'     => 'required',
            'attachment' => 'image',
        ]);

        if ($order->status !== $request->status) {
            $params = [
                'status'   => $request->status,
                'order_id' => $order->id,
                'user_id'  => Auth::id(),
            ];

            if ((int)$request->status === self::CANCELED) {
                $params = array_merge($params, [
                    'note' => 'Canceled by Admin',
                ]);
            } else {
                $params = array_merge($params, [
                    'note' => 'Updated by Admin',
                ]);
            }

            $newState = new OrderTracking($params);
            $newState->save();
        }

        $order->day       = date('l d-m-Y', strtotime($request->day));
        $order->time      = date('h:i A', strtotime($request->time));
        $order->status    = $request->status;
        $order->worker_id = ((int)$request->worker > 0)
            ? $request->worker : $order->worker_id;
        $order->save();

        if ($request->file('attachment')) {
            $attachment          = $request->file('attachment');
            $attachment_fileName = uniqid() . '.' . $attachment->getClientOriginalExtension();
            Storage::disk('uploads')
                ->putFileAs('orders/' . $order->id, $attachment, $attachment_fileName);

            @unlink(base_path($order->attach_path));

            $order->attachment = $attachment_fileName;
            $order->save();
        }

        if ($order->worker_id !== null) {
           /*  $message = NotificationType::where('type', 'new_order')->first()->message;
            $message = str_replace('{order_no}', '#' . $order->order_no, $message);

            pushNotification($order->worker_id, Auth::id(), $message);
            pushFCM($order->worker_id, 'order', $message, ['orderId', $order->id]); */


            $lang = User::where('id', $order->worker_id)->first();
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
            /*             pushFCM($order->worker_id, 'order', $message, ['orderId', $order->id]);
 */

            $language = Auth::user()->language;
            if ($language == 'arabic') {
                $message = NotificationType::where('type', 'new_order')
                    ->first()->message_ar;
                pushFCM($order->worker_id, 'order', $message, ['orderId', $order->id]);
            } else if ($language == 'english') {
                $message  = NotificationType::where('type', 'new_order')
                    ->first()->message_en;
                pushFCM($order->worker_id, 'order', $message, ['orderId', $order->id]);
            } else {
                $message  = NotificationType::where('type', 'new_order')
                    ->first()->message;
                pushFCM($order->worker_id, 'order', $message, ['orderId', $order->id]);
            }
        }

        $state = [
            self::ACCEPTED,
            self::COMPLETED,
            self::CANCELED,
        ];

        if ($order->client_id !== null
            && in_array($order->status, $state, false)) {
            $state = [
                self::ACCEPTED  => 'accept',
                self::COMPLETED => 'complete',
                self::CANCELED  => 'cancel',
            ];

          /*    $message = NotificationType::where('type', 'order_' . $state[$order->status])->first()->message;
            $message = str_replace('{order_no}', '#' . $order->order_no, $message);

            pushNotification($order->client_id, $order->worker_id, $message);
            pushFCM($order->client_id, 'order', $message, ['orderId', $order->id]);
 */

 dd(Auth::user()->language);
            $language = Auth::user()->language;
            if ($language == 'arabic') {
                $message = NotificationType::where('type',  'order_' . $state[$order->status])
                    ->first()->message_ar;
            } else if ($language == 'english') {
                $message  = NotificationType::where('type',  'order_' . $state[$order->status])
                    ->first()->message_en;
            } else {
                $message  = NotificationType::where('type',  'order_' . $state[$order->status] )
                    ->first()->message;
            }
            $message = str_replace('{order_no}', '#' . $order->order_no, $message);


            pushNotification($order->client_id, $order->worker_id, $message);
            pushFCM($order->client_id, 'order', $message, ['orderId', $order->id]);
        }

        (new API\OrderController())
            ->startNewConversation(
                $order->client_id,
                $order->worker_id,
                $order->id
            );

        $request->session()->flash(
            'success',
            trans('admin.order_update_success')
        );
        return redirect()->back();
    }

    /**
     * Remove the specified order from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        if (order::find($id)->delete()) {
            return response()->json("success", 200);
        }
        return response()->json("error", 200);
    }

    public function orders($id)
    {
        $user = User::where([
            ['id', $id],
        ])->first();

        $role = $user->role;

        $order = Order::where($role . '_id', $id)
            ->with('worker', 'client')->get();
        if (!$order) {
            $redirect = $role . 's.index';
            return $this->_404(
                trans('admin.no_orders'),
                $this->mainTitle,
                $redirect
            );
        }

        $canceld_order   = Order::where([
            [$role . '_id', $id],
            ['status', self::CANCELED],
        ])->get();
        $completed_order = Order::where([
            [$role . '_id', $id],
            ['status', self::COMPLETED],
        ])->get();

        $this->mainTitle = ($role === 'worker')
            ? trans('admin.worker_orders')
            : trans('admin.client_orders');

        $person = ($role === 'worker')
            ? '<a href="' . route('workers.show', $user->id) . '">' . $user->name . '</a>'
            : '<a href="' . route('clients.show', $user->id) . '">' . $user->name . '</a>';

        $totalOrdersPrice = array_sum(array_column($order->toArray(), 'total_price'));
        $number           = $totalOrdersPrice;

        if ($number < 1000000) {
            // Anything less than a million
            $format = number_format($number / 1000, 2) . 'K';
        } else if ($number < 1000000000) {
            // Anything less than a billion
            $format = number_format($number / 1000000, 2) . 'M';
        } else {
            // At least a billion
            $format = number_format($number / 1000000000, 2) . 'B';
        }
        $totalOrdersPrice = $format;

        return view('clients.orders', [
            'mainTitle'        => $this->mainTitle,
            'title'            => $this->mainTitle,
            'orders'           => $order,
            'user_id'          => $id,
            'role'             => $role,
            'person'           => $person,
            'totalOrdersPrice' => $totalOrdersPrice,
            'canceledOrders'   => count($canceld_order),
            'completedOrders'  => count($completed_order),
        ]);
    }

    public function deleteNote($id)
    {
        $note = OrderNote::find($id);

        Order::where('id', $note->order_id)
            ->decrement(
                'total_price',
                $note->price
            );

        $note->delete();
        return response()->json('success', 200);
    }

    public function deleteOrderService($order, $service)
    {
        $service = OrderService::where([
            ['service_id', $service],
            ['order_id', $order]
        ])->first();

        Order::where('id', $service->order_id)
            ->decrement(
                'total_price',
                $service->price
            );

        $service->delete();
        return response()->json('success', 200);
    }
}
