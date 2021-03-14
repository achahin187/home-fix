<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Storage;

class TermController extends Controller
{
    public function index()
    {
        $settings = DB::table('settings')
            ->first()->settings;
        $settings = json_decode($settings);

        $terms = 'terms_' . app()->getLocale();
        $terms = $settings->$terms ?? '';

       $image = Storage::disk('uploads')
                ->url(
                    'images/' . $settings->terms_image
                ) . '?t=' . time(); 

        $conditions = 'conditions_' . app()->getLocale();
        $conditions = $settings->$conditions ?? '';

        $terms      = str_replace('|', "\n", $terms);
        $conditions = str_replace('|', "\n", $conditions);

        return __success([
            'terms'      => $terms,
            'conditions' => $conditions,
          'image'      => $image
       ], 200);
    }
}
