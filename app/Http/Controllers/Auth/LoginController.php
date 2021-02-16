<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/admin';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->middleware('guest')->except('logout');
    }

    /**
     * Log the user out of the application.
     *
     * @param Request $request
     * @return Response
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();
        $request->session()->invalidate();
        return $this->loggedOut($request) ?: redirect('/admin');
    }

    protected function authenticated(Request $request, $user)
    {
        if (Auth::check()) {
            if (in_array(Auth::user()->role, ['client', 'worker'])) {
                Auth::logout();
                return view('auth.login', ['error' => 'عفواً، لا يمكنك تسجيل الدخول!']);
            }
            if (Auth::user()->ban === 1) {
                Auth::logout();
                return view('auth.login', ['error' => 'لقد تم حظرك عضويتك!']);
            } elseif (Auth::user()->verified === 0) {
                Auth::logout();
                return view('auth.login', ['error' => 'عفواً، عضويتك غير مفعلة!']);
            }
        }
    }
}
