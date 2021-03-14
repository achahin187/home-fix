<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class contactUs extends Model
{
    protected $table = 'contact_us';
    protected $fillable = ['User_Name', 'Email', 'Information', 'Message'];
   
    public $timestamps = false;

}
