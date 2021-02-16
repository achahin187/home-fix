<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;
use Illuminate\Support\Facades\Auth;

class Message extends Model
{
    protected $table = 'conversation_replay';

    protected $fillable = [
        'message', 'attachment',
        'conversation_id',
        'user_id', 'status'
    ];

    protected $hidden = [
        'user_id', 'updated_at'
    ];

    protected $casts = [
        'attachment'      => 'integer',
        'conversation_id' => 'integer',
    ];

    protected $appends = [
        'sender_id', 'sender_name',
        'conversation_image'
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class, 'conversation_id', 'con_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'user_id')
            ->select('id', 'name');
    }

    public function getSenderIdAttribute()
    {
        $user = User::where('id', $this->user_id);
        return $user->first()->id;
    }

    public function getSenderNameAttribute()
    {
        $user = User::where('id', $this->user_id);
        return $user->first()->name;
    }

    public function getSenderImageAttribute()
    {
        $user = User::where('id', $this->user_id);
        return Storage::disk('uploads')
            ->url('avatars/' . $user->first()->id . '/avatar.png');
    }

    public function getConversationImageAttribute()
    {
        $conversation = $this->conversation()->first();
        $user_one     = $conversation->user_one;
        $user_two     = $conversation->user_two;

        $user_id = ((int) $user_one === (int) Auth::id())
            ? $user_two : $user_one;

        return Storage::disk('uploads')
            ->url('avatars/' . $user_id .
                '/avatar.png') . '?t=' . time();
    }
}
