<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $table = 'cities';

    protected $fillable = [
        'name_en','name_tr','name_ar', 'country_id',
        'status',
    ];

    public function country()
{
    return $this->belongsTo('App\Country');
}

    public function getNameAttribute()
    {
        $name = 'name_' . app()->getLocale();
        return $this->$name;
    }
}
