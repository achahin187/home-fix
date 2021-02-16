<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderTracking extends Model
{
    protected $table = 'order_tracking';

    protected $fillable = [
        'order_id', 'user_id',
        'status', 'note',
    ];

    protected $appends = [
        'status_name', 'user',
    ];

    public function getUserAttribute()
    {
        return $this->belongsTo(User::class, 'user_id')->first();
    }

    public function getStatusNameAttribute()
    {
       $status = [
            trans('app.PENDING'), trans('app.ACCEPTED'),
            trans('app.ARRIVED'), trans('app.PRICE_VALIDATION'),
            trans('app.STARTED'), trans('app.CHECKING'),
            trans('app.COMPLETED'), trans('app.CANCELED'),trans('app.CLIENT_ACCEPT') , trans('app.CLIENT_APPROVE')
        ];

        return $status[(int)$this->status] ?: $status[0];
    }
}
