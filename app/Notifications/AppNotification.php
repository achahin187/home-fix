<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class AppNotification extends Notification
{
    use Queueable;

    protected $by;
    protected $message;
    protected $date_time;

    /**
     * Create a new notification instance.
     * @param $by
     * @param $message
     */
    public function __construct($by, $message)
    {
        $this->by        = $by;
        $this->message   = $message;
        $this->date_time = Carbon::now()->format('m/d/Y h:i A');
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'by'        => $this->by,
            'message'   => $this->message,
            'date_time' => $this->date_time,
        ];
    }
}
