<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    protected $fillable = [
        'ar_title', 'en_title','ar_section','tr_title',
        'en_section','tr_section','image'
    ];

    public function getImageAttribute($val)
    {
    
        return ($val !== null) ? url('/storage/features/' . $this->id .'/'. $val) : "";

    }

}

