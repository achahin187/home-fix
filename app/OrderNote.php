<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderNote extends Model
{
    protected $table = 'order_notes';

    protected $fillable = [
        'service', 'quantity', 'price',
        'order_id', 'status'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    protected $casts = [
        'price'    => 'double',
        'quantity' => 'double',
        'status'   => 'integer'
    ];
}
