<?php

namespace App\Http\Controllers;

use Avatar;
use Storage;

class LocaleController extends Controller
{
    /**
     * Change default language.
     */
    public function lang($code = null)
    {
        if (!in_array($code, config('app.languages'), false)) {
            return redirect()->back();
        }

        session()->put('app.locale', $code);
        session()->put('app.flag', config('app.flags')[$code]);

        return redirect()->back();
    }
}
