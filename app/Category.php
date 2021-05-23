<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;

class Category extends Model
{
    protected $table = 'categories';

    protected $fillable = [
        'name_en', 'name_ar', 'name_tr', 'parent_id'
    ];

    protected $hidden = [
        'parent_id', 'name_en', 'name_ar', 'name_tr',
        'created_at', 'updated_at',
    ];

    protected $appends = ['name'];

    protected $casts = [];

    public function subCategories()
    {
        return $this->hasMany(Category::class, 'parent_id')
            ->with('checkup', 'services');
    }




    public function offers()
    {

            return $this->hasMany(Offer::class, 'category_id')->where('status', true)->where('country_id',auth()->user()->country_id);




    }


    public function workers()
    {
        return $this->belongsToMany(User::class, 'worker_category')
            ->select('id', 'name', 'latitude', 'longitude')
            ->where([
                ['role', 'worker'],
                ['ban', false],
                ['verified', true]
            ]);
    }

    public function services()
    {
        return $this->hasMany(Service::class, 'category_id')
            ->where([
                ['checkup', false],
                ['quick', false],
                ['status', true],
            ]);
    }

    public function checkup()
    {
        return $this->hasOne(Service::class, 'category_id')
            ->where('checkup', true)->withDefault(function () {
                return new Service();
            });
    }

    public function quick()
    {
        return $this->hasOne(Service::class, 'category_id')
        ->where('quick', true)->withDefault(function () {
            return new Service();
        });
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }



    public function getImageAttribute()
    {
        return Storage::disk('uploads')->url('images/categories/' . $this->id .'/icon.png') .'?t=' . time();
    }

    public function getNameAttribute()
    {
        $name = 'name_' . app()->getLocale();
        return $this->$name;
    }
}
