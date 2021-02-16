<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Order;
use App\Review;
use App\User;
use Avatar;
use Illuminate\Http\Request;
use Storage;
use Validator;

use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function pushReview(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'review'   => 'required|numeric|between:0.00,5.00',
            'comment'  => 'required|string',
            'user_id'  => 'required|numeric',
            'order_id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return __error($validator->errors()->all()[0], 200);
        }

        $review = new Review([
            'review'   => (double)$request->review,
            'comment'  => $request->comment,
            'user_id'  => $request->user_id,
            'order_id' => $request->order_id,
        ]);

        $review->save();

        $user  = User::where('id', $review->user_id)
            ->first();
        $order = Order::where('id', $request->order_id)
            ->first();

        $total_review = ($user->review > 0)
            ? ($user->review + $review->review) / 2
            : $review->review;
        $user->review = $total_review;
        $user->save();

        if(Auth::user()->role === 'client'){
            $order->status = 9;
        }elseif(Auth::user()->role === 'worker') {
                $order->status =6;
        }
        $order->save();

        return (new OrderController())
            ->getOrderDetails($order->id);
    }
}
