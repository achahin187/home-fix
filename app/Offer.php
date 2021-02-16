<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;

class Offer extends Model
{
    protected $table = 'offers';

    protected $fillable = [
        'name_en', 'name_ar', 'name_tr',
        'description_en', 'description_ar', 'description_tr',
        'price', 'category_id','country_id', 'end_at'
    ];

    protected $hidden = [
        'name_en', 'name_ar', 'name_tr', 'category_id',
        'description_en', 'description_ar', 'description_tr',
        'end_at', 'created_at', 'updated_at',
    ];

    protected $appends = [
        'image', 'name',
        'description',
        'countdown'
    ];

    protected $casts = [
        'price' => 'double',
    ];

    public function workers()
    {
        return $this->belongsToMany(User::class, 'offer_workers')
            ->select('id', 'name', 'email', 'phone',
                'latitude', 'longitude',
                'offer_workers.status')
            ->where([
                ['role', 'worker'],
                ['ban', false],
                ['verified', true]
            ]);
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function getImageAttribute()
    {
        return Storage::disk('uploads')
                ->url('images/offers/' . $this->id .
                    '/image.png') . '?t=' . time();
    }

    public function getNameAttribute()
    {
        $name = 'name_' . app()->getLocale();
        return $this->$name;
    }

    public function getDescriptionAttribute()
    {
        $description = 'description_' . app()->getLocale();
        return $this->$description;
    }

    public function getCountdownAttribute()
    {
        $rem = strtotime($this->end_at) - time();

        $day = floor($rem / 86400);
        $hr  = floor(($rem % 86400) / 3600);
        $min = floor(($rem % 3600) / 60);
        $sec = ($rem % 60);

        $day = ($day > 0) ? $day . ' ' . trans_choice('api.day', $day) . ' ' : '';
        $hr  = ($hr > 0) ? $hr . ' ' . trans_choice('api.hour', $hr) . ' ' : '';
        $min = ($min > 0) ? $min . ' ' . trans_choice('api.minute', $min) . ' ' : '';
        $sec = ($sec > 0) ? $sec . ' ' . trans_choice('api.seconed', $sec) : '';

        return $day . $hr . $min . $sec . '.';
    }
}
