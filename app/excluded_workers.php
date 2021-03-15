<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class excluded_workers extends Model
{
    protected $table = 'excluded_workers';
    protected $guarded=[];





    public function user()
    {
        return $this->belongsToMany(User::class);
    }



}
