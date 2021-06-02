<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Technical extends Model
{
    protected $fillable = [
        'ar_title', 'en_title','ar_section','tr_title',
        'en_section','tr_section','ar_description', 'en_description','tr_description'
    ];
}
