<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderService extends Model
{
    protected $table = 'order_services';
        protected $guarded=[];


    protected $casts = [
        'price'    => 'double',
        'quantity' => 'double',
    ];
}
