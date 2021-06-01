<?php

namespace App;

use App\Extensions\HasPermissionsTrait;
use App\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Storage;

class User extends Authenticatable
{
    use Notifiable, HasPermissionsTrait;

    protected $table = 'users';

    protected $fillable = [
        'name', 'email', 'phone', 'password',
        'address', 'latitude', 'longitude',
        'role', 'ban', 'verified', 'notes',
        'activation_key', 'api_token', 'cc',
        'avatar', 'phone_verified_at',
        'notification_key', 'cv',
        'identity', 'badge','language','status_image','status_location',
    ];

    protected $hidden = [
        'password', 'remember_token',
        'phone_verified_at', 'cc',
        'created_at', 'updated_at',
        'identity', 'cv',
        'notification_key', /*'activation_key'*/
    ];

    protected $appends = [
        'avatar', 'total_orders',
        'total_last_missions',
        'total_in_progress',
        'cv_path', 'id_path',
        'user_country',
         'country_id',
         'user_country_id',
        'user_city',
        'user_area',
        'user_currency',
        'user_address',
    ];

    protected $casts = [
        'ban'            => 'integer',
        'badge'          => 'integer',
        'verified'       => 'integer',
        'activation_key' => 'integer',
        'review'         => 'double',
    ];

    // Order Status Indicator
    protected const COMPLETED = 6;
    protected const CANCELED  = 7;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }

    public function offers()
    {
        return $this->belongsToMany(Offer::class, 'offer_workers')
            ->wherePivot('status', true);
    }

    public function category()
    {
        return $this->belongsToMany(Category::class, 'worker_category');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'user_id', 'id');
    }
  public function worker_category()
    {
        return $this->hasMany(worker_category::class, 'user_id');
    }
    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'user_id', 'id');
    }

    public function workerOrders()
    {
        return $this->hasMany(Order::class, 'worker_id');
    }

    public function clientOrders()
    {
        return $this->hasMany(Order::class, 'client_id');
    }

    public function conversations()
    {
        return $this->hasMany(Conversation::class, [
            'user_one', 'user_two'
        ]);
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'user_id');
    }

    public function getAvatarAttribute()
    {
        // return Storage::disk('uploads')
        //         ->url('avatars/' . $this->id .
        //             '/avatar.png') . '?t=' . time();
        return 'storage/app/public/avatars/'.$this->id. '/avatar.png' . '?t=' . time();
    }

    public function getTotalOrdersAttribute()
    {
        $role = $this->find($this->id)->role;
        if (in_array($role, ['worker', 'client'])) {
            $orders = Order::where([
                [$role . '_id', $this->id],
                ['status', '<>', self::CANCELED]
            ])->get();
            return count($orders);
        } else {
            return 0;
        }
    }

    public function getTotalLastMissionsAttribute()
    {
        $role = $this->find($this->id)->role;
        if (in_array($role, ['worker', 'client'])) {
            $orders = Order::where([
                [$role . '_id', $this->id],
                ['status', self::COMPLETED]
            ])->get();
            return count($orders);
        } else {
            return 0;
        }
    }

    public function getTotalInProgressAttribute()
    {
        $role = $this->find($this->id)->role;
        if (in_array($role, ['worker', 'client'])) {
            $orders = Order::where([
                [$role . '_id', $this->id],
                ['status', '<>', self::CANCELED],
                ['status', '<>', self::COMPLETED],
            ])->get();
            return count($orders);
        } else {
            return 0;
        }
    }

    public function getCvPathAttribute()
    {
        if($this->cv != null) {
            return 'storage/app/public/CVs/'. $this->id .'/' . $this->cv;

        }else{
            return null;
        }

    }

    public function getIdPathAttribute()
    {

        if($this->identity != null) {
            return 'storage/app/public/identities/'. $this->id .'/' . $this->identity;

        }else{
            return null;
        }


    }

    /*public function getBadgePathAttribute()
    {
        if ((int)$this->badge === 1) {
            return asset('/images/certificate.png');
        } else {
            return asset('/images/un_certificate.png');
        }
    }*/

    public function country()
    {
        return $this->belongsToMany(Country::class, 'user_addresses')
            ->withPivot('area');
    }

    public function city()
    {
        return $this->belongsToMany(City::class, 'user_addresses');
    }

    public function getUserCountryAttribute()
    {
        $_country = $this->country()->first();
        return $_country->name ?? '';
    }
        public function getCountryIdAttribute()
    {
        $_country = $this->country()->first();
        return $_country->id ?? '';
    }

    public function getUserCurrencyAttribute()
    {
        $_country = $this->country()->first();
        return $_country->currency ?? '';
    }

    public function getUserCountryIdAttribute()
    {
        $_country = $this->country()->first();
        return $_country->id ?? '';
    }

    public function getUserCityAttribute()
    {
        return $this->city()->first()->name ?? '';
    }
    public function getUserCity_id()
    {
        return $this->city()->first()->id ?? '';
    }

    public function getUserAreaAttribute()
    {
        $_country = $this->country()->first();
        $area     = $_country->pivot->area ?? '';
        return $area;
    }

    public function getUserAddressAttribute()
    {
        return [
            'country'   => $this->getUserCountryAttribute(),
            'city'      => $this->getUserCityAttribute(),
            'currency'  => $this->getUserCurrencyAttribute(),
            'area'      => $this->getUserAreaAttribute(),
            'city_id' => $this->getUserCity_id(),
        ];
    }

    public function getUserCategoryAttribute()
    {
        $category = $this->category()->first();
        return $category->name ?? '';
    }

    public function getWorkerCategoryAttribute()
    {
        return [
            'category'   => $this->getUserCategoryAttribute(),

        ];
    }
    public function getUserReviewAttribute()
    {
        $review = $this->review()->first();
        return $review->review ?? '';
    }
    public function getReviewsAttribute()
    {
        return [
            'review'   => $this->getUserReviewAttribute(),

        ];
    }



    /**
     * Send the password reset notification.
     *
     * @param string $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
