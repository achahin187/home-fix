<?php

namespace App\Http\Controllers;

use App\Category;
use App\Order;
use App\OrderService;
use App\User;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    protected $mainTitle;


    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin|manager']);
        $this->mainTitle = trans('admin.reports_management');
    }

    public function index()
    {
        $workers = User::where([
            ['role', 'worker'],
            ['ban', false],
            ['verified', true],
        ])->get();

        $clients          = User::where('role', 'client')->get();
        $workers_c        = User::where('role', 'worker')->get();
        $reviews          = (count($workers_c) > 0) ?
                ($workers_c->sum('review') / count($workers_c) * 100 / 5) : 0;
        $orders           = Order::where('status', '<>', self::CANCELED)->get();
        $new_orders       = Order::whereRaw('created_at > DATE_SUB(NOW(), INTERVAL 2 DAY)')
            ->with('worker', 'client')->orderBy('id', 'desc')->get();
        $total_orders     = count($orders->toArray());
        $totalOrdersPrice = array_sum(array_column(json_decode($orders), 'total_price'));
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

        $locale = app()->getLocale();

        $pops = OrderService::selectRaw('COUNT(categories.name_' . $locale . ') AS how_many,
                                        categories.name_' . $locale . ' AS name,
                                        categories.parent_id, categories.id')
            ->join('services', 'services.id', '=', 'order_services.service_id')
            ->join('categories', 'categories.id', '=', 'services.category_id')
            ->where('categories.parent_id', '<>', null)
            ->groupBy('categories.name_' . $locale . '', 'categories.id', 'categories.parent_id')
            ->orderBy('how_many', 'DESC')->limit(10)->get();

        $pop = (count($pops->toArray()) > 0)
            ? array_column($pops->toArray(), 'id')
            : [0];
        $pop = Category::whereIn('id', $pop)->get();

        $parents = [];
        foreach ($pop as $pcat) {
            $parents[$pcat->id] = $pcat->parent()->first();
        }

        $_clients    = Order::selectRaw('COUNT(users.id) AS how_many, users.id as user_id')
            ->join('users', 'users.id', '=', 'orders.client_id')
            ->where('orders.status', '<>', '\'' . self::CANCELED . '\'')
            ->groupBy('users.id')->orderBy('how_many', 'DESC')
            ->limit(10)->get();
        $clients_ids = (count($_clients->toArray()) > 0)
            ? array_column($_clients->toArray(), 'user_id')
            : [0];
        $_clients    = User::whereIn('id', $clients_ids)->get();

        $_workers = Order::selectRaw('COUNT(users.id) AS how_many, users.id as user_id')
            ->join('users', 'users.id', '=', 'orders.worker_id')
            ->where('orders.status', '<>', '\'' . self::CANCELED . '\'')
            ->groupBy('users.id')->orderBy('how_many', 'DESC')
            ->limit(10)->get();

        $workers_ids = (count($_workers->toArray()) > 0)
            ? array_column($_workers->toArray(), 'user_id')
            : [0];
        $_workers    = User::whereRaw('id in (' . implode(',', $workers_ids) . ')')->get();

        $active_clients = [];
        foreach ($_clients as $client) {
            $active_clients[$client->id] = [
                'client' => $client,
                'orders' => $client->clientOrders()->get()
            ];
        }

        $active_workers = [];
        foreach ($_workers as $worker) {
            $active_workers[$worker->id] = [
                'worker' => $worker,
                'orders' => $worker->workerOrders()->get()
            ];
        }

        $revenue = DB::table('orders')->where('status', '<>', self::CANCELED)
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('round(sum(total_price), 2) as prices')
            )
            ->groupBy('date')->get();

        $status = [
            trans('app.PENDING'), trans('app.ACCEPTED'),
            trans('app.ARRIVED'), trans('app.PRICE_VALIDATION'),
            trans('app.STARTED'), trans('app.CHECKING'),
            trans('app.COMPLETED'), trans('app.CANCELED')
        ];

        return view(
            'reports.index',
            [
                'total_orders'        => $total_orders,
                'total_orders_prices' => $totalOrdersPrice,
                'clients'             => count($clients),
                'status'              => $status,
                'workers_c'           => count($workers_c),
                'reviews'             => $reviews,
                'new_orders'          => $new_orders,
                'active_clients'      => $active_clients,
                'active_workers'      => $active_workers,
                'services'            => $pops,
                'parents'             => $parents,
                'workers'             => $workers,
                'revenue'             => $revenue,
            ]
        );
    }
}
