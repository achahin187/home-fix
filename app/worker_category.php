<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class worker_category extends Model
{
    protected $table = 'worker_category';


    protected $fillable = [
        'category_id', 'user_id'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }


}
