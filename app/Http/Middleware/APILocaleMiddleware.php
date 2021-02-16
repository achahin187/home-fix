<?php

namespace App\Http\Middleware;

use Closure;

class APILocaleMiddleware
{
    public function handle($request, Closure $next)
    {
        $locale = ($request->hasHeader('X-localization'))
            ? $request->header('X-localization')
            : 'ar';

        if (!in_array($locale, config('app.languages'))) {
            return __error(trans('api.language_notfound'), 200);
        }

        app()->setLocale($locale);

        // get the response after the request is done
        $response = $next($request);

        // set Content Languages header in the response
        $response->header('X-localization', $locale);

        // return the response
        return $response;
    }
}
