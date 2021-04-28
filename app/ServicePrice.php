<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServicePrice extends Model
{
    protected $fillable = [
        'country_id', 'service_id', 'price'
    ];


    public function services()
    {
        return $this->belongsTo(Service::class);
    }

    public function country()
    {

        return $this->belongsTo(Country::class);
    }

    public function getServiceCountryAttribute()
    {
        $country_name = $this->country()->first();
        return $country_name->name ?? '';
    }
}
