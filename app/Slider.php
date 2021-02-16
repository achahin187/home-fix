<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;

class Slider extends Model
{
    protected $table = 'slider';

    protected $fillable = [
        'title_en', 'title_ar','title_tr',
        'text_en', 'text_ar','text_tr', 
        'image'
    ];



    public function getImageAttribute($val)
    {
        // return Storage::disk('uploads')
        //     ->url('images/sliders/' . $this->id .
        //         '/icon.png') . '?t=' . time();
        return ($val !== null) ? url('public/uploads/sliders/' . $this->id .'/'. $val) : "";

    }

    public function getNameAttribute()
    {
        $title_ = 'title_' . app()->getLocale();
        return $this->$title_;
    }




}
