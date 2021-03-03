<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;

class Order extends Model
{
    protected $table = 'orders';

    protected $fillable = [
        'order_no', 'issue', 'cod', 'status',
        'address', 'latitude', 'longitude',
        'client_id', 'country_id',
        'worker_id', 'offer_id',
        'day', 'time', 'total_price',
        'attachment'
    ];

    protected $hidden = [
        'updated_at',
    ];

    protected $appends = [
        'image', 'status_name',
        'conversation_id',
        'services', 'attach_path',
        'currency'
    ];

    protected $casts = [
        'total_price' => 'double',
        'status'      => 'integer',
        'cod'         => 'integer',
    ];

    public function worker()
    {
        return $this->belongsTo(User::class, 'worker_id')
            ->select('id', 'name', 'email', 'phone', 'review');
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id')
            ->select('id', 'name', 'email', 'phone', 'review');
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'order_services')
            ->select('services.*', 'order_services.quantity');
    }

    public function servicesDetails()
    {
        return $this->hasMany(OrderService::class, 'order_id');
    }

    public function offer()
    {
        return $this->belongsToMany(Offer::class, 'orders', 'id', 'offer_id')
            ->select('offers.*');
    }

    public function notes()
    {
        return $this->hasMany(OrderNote::class, 'order_id');
    }

    public function conversation()
    {
        return $this->hasOne(Conversation::class, 'order_id');
    }

    public function payment()
    {
        return $this->hasOne(Invoice::class, 'order_id');
    }

    public function tracking()
    {
        return $this->hasMany(OrderTracking::class, 'order_id');
    }

    public function getImageAttribute()
    {
        if ($this->offer_id !== null) {
            $service = $this->offer()->first();
            if ($service !== null) {
                $service = Offer::where(
                    'id', $service->id
                )->first();
            }
        } else {
            $service = $this->services()->first();
            if ($service !== null) {
                $service = Service::where(
                    'id', $service->id
                )->first();
            }
        }

        if ($service !== null) {
            $category = $service->category();
            if(isset($category->first()->parent_id)){
                if ($category->first()->parent_id > 0) {
                    $category = $category->first()
                        ->parent()->first();
                } else {
                    $category = $category->first();
                }
                return ($category !== null) ? $category->image : '';

            }
      
        } else {
            return '';
        }
    }

    public function getAttachPathAttribute()
    {
        return $this->attachment !== ''
            ? Storage::disk('uploads')
                ->url('orders/' . $this->id .
                    '/' . $this->attachment)
            : '';
    }

    public function getCurrencyAttribute()
    {
        $currency = $this->belongsTo(Country::class, 'country_id');
        return $currency->first()->currency ?? config('app.currency');
    }

    public function getServicesAttribute()
    {
        if ($this->offer_id !== null) {
            $offer = $this->offer()->first();

            $offer['quantity'] = 1;
            return [$offer];
        } else {
            return $this->services()->get();
        }
    }

    public function getConversationIdAttribute()
    {
        $conversation = Conversation::where([
            ['order_id', $this->id],
            ['user_one', $this->client_id],
            ['user_two', $this->worker_id],
        ]);

        if ($conversation->first()) {
            return (int)$conversation
                ->first()->con_id;
        }
    }

    public function getStatusNameAttribute()
    {
        $status = [
            trans('app.PENDING'), trans('app.ACCEPTED'),
            trans('app.ARRIVED'), trans('app.PRICE_VALIDATION'),
            trans('app.STARTED'), trans('app.CHECKING'),
            trans('app.COMPLETED'), trans('app.CANCELED'),
            trans('app.CLIENT_ACCEPT') , trans('app.CLIENT_APPROVE')
        ];

        return $status[(int)$this->status] ?: $status[0];
    }
}
