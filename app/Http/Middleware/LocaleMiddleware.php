<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LocaleMiddleware
{
    protected $lags;

    public function __construct()
    {
        $this->langs = config('app.languages');
    }

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (session()->has('app.locale')
            && in_array(session()->get('app.locale'), $this->langs)) {
            app()->setLocale(session()->get('app.locale'));
        }
        return $next($request);
    }

}
