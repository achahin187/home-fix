<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;

class Partners extends Model
{
    protected $table = 'partners';

    protected $fillable = [

        'image'
    ];



    // public function getImageAttribute($val)
    // {

        
    //             return $this->image !== ''
    //         ? Storage::disk('uploads')
    //             ->url('partners/' .
    //                 '/' . $this->image)
    //         : '';

    // }



}
