<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $table = 'countries';

    protected $fillable = [
        'name_en', 'name_tr','name_ar','currency_en','currency_tr','currency_ar','max_length',
        'status',
    ];


    public function cities()
    {
        return $this->hasMany(City::class, 'country_id');
    }

    public function offer()
    {
        return $this->hasOne(Offer::class, 'country_id');
    }

    public function servicePrice()
    {
        return $this->hasOne(ServicePrice::class,'country_id');
    }


 /*    public function getNameAttribute()
    {
        $name = 'name_' . app()->getLocale();
        return $this->$name;
    }
    public function getcurrencyAttribute()
    {
        $currency = 'currency_' . app()->getLocale();
        return $this->$currency;
    } */


}
