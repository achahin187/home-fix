<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    protected $token;

    protected $notifiable;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($token, $notifiable)
    {
        $this->token      = $token;
        $this->notifiable = $notifiable;
    }

    /**
     * Build the message.
     *
     * @return \App\Notifications\ResetPassword
     */
    public function build()
    {
        return $this->from('example@homefix.com')
            ->view('auth.passwords.mail', [
            'url'  => url(config('app.url') . route('password.reset', $this->token, false)),
            'name' => $this->notifiable->name,
        ]);
    }
}
