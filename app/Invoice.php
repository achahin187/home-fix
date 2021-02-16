<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $table = 'invoices';

    protected $fillable = [
        'user_id', 'transaction_id',
        'amount', 'currency', 'state',
        'created_at', 'updated_at',
    ];

}
