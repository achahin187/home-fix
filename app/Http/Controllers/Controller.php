<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use File;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Storage;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $time;
    protected $timestamp;

    // Order Status Indicator
    protected const PENDING          = 0;
    protected const ACCEPTED         = 1;
    protected const ARRIVED          = 2;
    protected const PRICE_VALIDATION = 3;
    protected const STARTED          = 4;
    protected const CHECKING         = 5;
    protected const COMPLETED        = 6;
    protected const CANCELED         = 7;
    protected const BOUGHT           = 8;

    public function __construct()
    {
        $this->time = Carbon::now(
            config('app.timezone')
        )->isoFormat('lll');

        $this->timestamp = Carbon::now(
            config('app.timezone')
        )->timestamp;
    }

    public function _404($message, $title, $route)
    {
        return view('errors.dash.404', [
            'message' => $message,
            'title'   => $title,
            'route'   => $route,
        ]);
    }

    public function _401($title)
    {
        return view('errors.dash.401', [
            'title' => $title,
        ]);
    }

    protected function createPlaceHolderAvatar($id, $name)
    {
        ini_set('max_execution_time', 0);
        ini_set('allow_url_fopen',1) ;
         
        $path = base_path(Storage::disk('uploads')
            ->url('avatars/' . $id));

        @File::makeDirectory($path);

        $avatar = "https://ui-avatars.com/api/?name=" . $name . "&rounded=true&size=128";
        $avatar = file_get_contents($avatar,
            false, stream_context_create([
                'ssl' => [
                    'verify_peer'      => false,
                    'verify_peer_name' => false,
                ]
            ]));

        $avatar_fileName = 'avatar.png';
        @file_put_contents($path . '/' . $avatar_fileName, $avatar);
    }
}
