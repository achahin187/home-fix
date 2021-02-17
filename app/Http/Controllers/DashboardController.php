<?php

namespace App\Http\Controllers;

use App\Order;
use App\User;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Notification;
<<<<<<< HEAD
use App\Http\Controllers\Auth;

=======
>>>>>>> d3c1b864f825b9d5f51322d971ef0b95d2fc3b2e
class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return Renderable
     */
    public function admin()
    {
<<<<<<< HEAD
       
=======
       //test
>>>>>>> d3c1b864f825b9d5f51322d971ef0b95d2fc3b2e
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
            ->with('worker', 'client')->get();
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

        $revenue = DB::table('orders')->where('status', '<>', self::CANCELED)
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('round(sum(total_price), 2) as prices')
            )
            ->groupBy('date')
            ->get();

        $status = [
            trans('app.PENDING'), trans('app.ACCEPTED'),
            trans('app.ARRIVED'), trans('app.PRICE_VALIDATION'),
            trans('app.STARTED'), trans('app.CHECKING'),
            trans('app.COMPLETED'), trans('app.CANCELED')
        ];

        return view(
            'dashboard',
            [
                'total_orders'        => $total_orders,
                'total_orders_prices' => $totalOrdersPrice,
                'clients'             => count($clients),
                'status'              => $status,
                'workers_c'           => count($workers_c),
                'reviews'             => $reviews,
                'new_orders'          => $new_orders,
                'workers'             => $workers,
                'revenue'             => $revenue,
            ]
        );
    }

    public function getRevenueBy(Request $request)
    {
        $query = $request->query('q');

        if ($query === 'day') {
            $query = 'DATE';
        } elseif ($query === 'week') {
            $query = 'WEEK';
        } elseif ($query === 'month') {
            $query = 'MONTHNAME';
        } elseif ($query === 'year') {
            $query = 'YEAR';
        } else {
            $query = 'DATE';
        }

        $revenue = DB::table('orders')->where('status', '<>', self::CANCELED)
            ->select(
                DB::raw($query . '(created_at) as date'),
                DB::raw('round(sum(total_price), 2) as prices')
            )
            ->groupBy('date')
            ->get();

        return response()->json($revenue, 200);
    }
}
