<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Service extends Model
{
    protected $table = 'services';

    protected $fillable = [
        'name_en', 'name_ar', 'name_tr', 'price',
        'quick', 'checkup', 'category_id'
    ];

    protected $hidden = [
        'name_en', 'name_ar','name_tr',
        'category_id', 'checkup',
        'quick', 'status',
        'created_at', 'updated_at',
    ];

    protected $appends = [
        'name', 'parent_category', 'pricebycountry'
    ];

    protected $casts = [
        'price' => 'double',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function prices()
    {
        return $this->hasMany(ServicePrice::class);
    }

 public function getPriceByCountryAttribute()

  {
      if(isset(Auth::user()->country()->first()->id)){
        $country = Auth::user()->country()->first()->id;

        return $this->prices()->get()
              ->where(
                  'country_id', $country
              )->first()->price ?? 0.00;
      }


  }


    public function getNameAttribute()
    {
        $name = 'name_' . app()->getLocale();
        return $this->$name;
    }

    public function getParentCategoryAttribute()
    {
        $cat = $this->category()->first();
        if ($cat['parent_id'] !== null) {
            return $cat->parent()->first();
        } else {
            return $cat;
        }
    }
}
