<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Complain extends Model
{
    protected $fillable = [
        'subject', 'content',
        'user_id', 'active',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
