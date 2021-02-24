<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $table = 'countries';

    protected $fillable = [
        'name', 'currency','max_length',
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


}
