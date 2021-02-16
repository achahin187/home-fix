<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $table = 'conversations';

    protected $fillable = [
        'user_one', 'user_two', 'order_id'
    ];

    protected $hidden = [
        'user_one', 'user_two', 'order_id',
        'created_at', 'updated_at'
    ];

    public function messages()
    {
        return $this->hasMany(Message::class, 'conversation_id', 'con_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'user_one');
    }

    public function worker()
    {
        return $this->belongsTo(User::class, 'user_two');
    }
}
