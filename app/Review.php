<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $table = 'reviews';

    protected $fillable = [
        'review', 'comment',
        'user_id', 'order_id',
    ];

    protected $hidden = [
        'user_id'
    ];

    protected $casts = [
        'review' => 'double:1',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id')
            ->select('id', 'order_no', 'offer_id');
    }

}
