<?php

namespace App\Http\Controllers\API;

use App\Country;
use App\Category;
use App\Mail\ResetPassword;
use App\Mail\ActivationCode;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;
use App\Rules\DisposableEmail;
use App\Rules\Password;
use App\Rules\PhoneNumber;
use App\User;
use App\UserAddress;
use Avatar;
use Carbon\Carbon;
use Exception;
use File;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Storage;
use Twilio\Rest\Client;
use Validator;
use App\Notifications\WorkerRegisterNotification;
use Notification;


class AuthController extends Controller
{
    protected $sid;
    protected $token;

    public function __construct()
    {
        parent::__construct();
        $this->sid   = env('TWILIO_ACCOUNT_SID');
        $this->token = env('TWILIO_AUTH_TOKEN');
    }



    public function register(Request $request, $role = null)
    {
     /*    public function getNameAttribute()
        {
            $name = 'name_' . app()->getLocale();
            return $this->$name;
        } */

             if ($request->isMethod('get')) {

                return __success(Country::where('status', true)
                    ->with('cities')->where('status', true)
                    ->get(), 200);

            }



            if ($role !== 'client' && $role !== 'worker') {
                return __error(trans('api.not_found'), 200);
            }


            $validator = Validator::make($request->all(), [
                'name'     => ['required','unique:users', 'min:2', 'max:60', 'not_regex:([0-9])'],
                'email'    => ['required', 'email', 'unique:users', new DisposableEmail()],
                'phone'    => ['required', 'unique:users', new PhoneNumber()],
                'password' => ['required', 'confirmed', new Password(8)],
                'cv'       => 'mimes:pdf,doc,docx',
                'identity' => 'mimes:jpeg,jpg,png',
                'country'  => 'required',
                'city'     => 'required',
                'area'     => 'required|string',

                ]);

                if ($validator->fails()) {
                    return __error($validator->errors()->all()[0], 200);
                }



                if ($role === 'worker') {
                    $validator = Validator::make($request->all(), [

                        'category' => 'required',

                        ]);

                        if ($validator->fails()) {
                            return __error($validator->errors()->all()[0], 200);
                        }
                    }




            $user = new User([
                'name'           => $request->name,
                'email'          => $request->email,
                'phone'          => $request->phone,
                'password'       => bcrypt($request->password),
                'activation_key' => random_int(10000, 99999),
                'role'           => $role,
                'status_image' => 1,
            ]);

            $user->notifications_key = $request->notifications_key;
            $user->api_token         = uniqid(base64_encode(Str::random(60)), false);
            $user->save();

            $user_address = new UserAddress([
                'user_id'    => $user->id,
                'country_id' => $request->country,
                'city_id'    => $request->city,
                'area'       => $request->area,
            ]);
            $user_address->save();

            if ($role === 'worker') {



                $categories = explode(',', $request->category);

                $user->category()->attach($categories);
                $user->save();




                if ($request->hasFile('cv')) {
                    //Upload Cv
                    $cv = $request->file('cv');
                    $cv_fileName = time() . '.' . $request->file('cv')->extension();
                    Storage::disk('uploads')
                    ->putFileAs('CVs/' . $user->id, $cv, $cv_fileName);

                @unlink(base_path($user->cv_path));

                        $user->cv = $cv_fileName;
                        $user->save();


                }



                if ($request->file('identity')) {
                    $identity          = $request->file('identity');
                    $identity_fileName = uniqid() . '.' . $identity->getClientOriginalExtension();
                    Storage::disk('uploads')
                        ->putFileAs('identities/' . $user->id, $identity, $identity_fileName);

                    @unlink(base_path($user->id_path));

                    $user->identity = $identity_fileName;
                    $user->save();
                }


            }

            if($role === 'client') {
                        #TODO: SMS Verification Code
            $this->sendSMS($user->phone , $user->activation_key);
                 #send mail
                  Mail::to($user->email)
                     ->send(new ActivationCode($user));

            }
            $this->createPlaceHolderAvatar($user->id, $user->name);

           if($role == 'worker'){
            $data = [
                'id'  => $user->id,
                'username' => $request->name,
                'avatar' => $user->avatar,
                'type' => 'new_worker',
            ];
            User::find(1)->notify(new WorkerRegisterNotification($data));
           }


            if($role === 'client') {
                return __success([
                    'api_token'      => $user->api_token,
                    'activation_key' => $user->activation_key,
                 ], 200);
            }


            if($role === 'worker') {
                return __success([
                    'api_token'      => $user->api_token,
                    'activation_key' => $user->activation_key,
                    'role'           =>$user->role,
                    'verified'=> Auth::user()->verified?? 0,
                    'status' =>'not Active',

                 ], 200);

            }

  /*       #TODO: SMS Verification Code
        $this->sendSMS($user->phone , $user->activation_key);
        #send mail
        Mail::to($user->email)
            ->send(new ActivationCode($user)); */





    }

        public function category(Request $request) {

        if ($request->isMethod('get')) {
            return __success(Category::where('parent_id', null)
            ->get(), 200);
        }

    }

    public function socialLogin(Request $request)
    {
        $user = User::where(
            'email', $request->email
        )->first();
        $users= User::where('id',auth::id())->where('email',$request->email)->exists();
        if($users) {

         return __error(trans('api.This email was taken before'),200);

        }else{
            if (!$user) {
                if (!$request->phone) {
                    return __error('Phone is required', 200);
                } else {
                    $validator = Validator::make($request->all(), [
                        'name'  => 'required|string',
                        'email' => ['required', 'email', 'unique:users', new DisposableEmail()],
                        'phone' => ['required', 'unique:users', new PhoneNumber()],
                    ]);

                    if ($validator->fails()) {
                        return __error($validator->errors()->all()[0], 200);
                    }

                    $user = new User([
                        'name'           => $request->name,
                        'email'          => $request->email,
                        'phone'          => $request->phone,
                        'password'       => bcrypt('socialLoginProvider'),
                        'activation_key' => random_int(10000, 99999),
                        'role'           => 'client',
                    ]);

                    $user->notifications_key = $request->notifications_key;
                    $user->save();
                     $user_address = new UserAddress([
                        'user_id'    => $user->id,
                        'country_id' => $request->country,
                        'city_id'    => $request->city,
                        'area'       => $request->area,
                    ]);
                    $user_address->save();

                    #TODO: SMS Verification Code
                    $this->sendSMS($user->phone , $user->activation_key);
                    try{
                        if ($request->image) {
                            $path = base_path(Storage::disk('uploads')->url('avatars/' . $user->id));
                            @File::makeDirectory($path);

                            $avatar = file_get_contents($request->image,
                                false, stream_context_create([
                                    'ssl' => [
                                        'verify_peer'      => false,
                                        'verify_peer_name' => false,
                                    ]
                                ]));

                            @file_put_contents($path . '/avatar.png', $avatar);
                        } else {
                            $this->createPlaceHolderAvatar($user->id, $user->name);
                        }
                    }catch(\Exception $e){
                        $this->createPlaceHolderAvatar($user->id, $user->name);
                    }
                }
            }



        }



        // User Login with Social networks!
        $user = User::where([
            ['email', $request->email],
        ])->first();

        $user->api_token = uniqid(base64_encode(Str::random(60)), true);
        $user->save();

        Auth::login($user);
        $user->is_social = 1;
        return __success($user, 200);
    }

    public function login(Request $request, Authenticatable $user = null)
    {






        try{

            $validator = Validator::make($request->all(), [
                'username' => 'required',
                'password' => 'required',
                'role'     => 'in:worker,client',
            ]);

            if ($validator->fails()) {
                return __error($validator->errors()->all()[0], 200);
            }

            $type = filter_var($request->username,
                FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

            $credentials = [
                $type      => $request->username,
                'password' => $request->password,
                'role'     => $request->role,
            ];


            if (Auth::attempt($credentials) && (Auth::user()->ban == 0) &&(Auth::user()->verified == 1)) {
                $user = $request->user();

                $user->api_token         = uniqid(base64_encode(Str::random(60)), false);
                $user->notifications_key = $request->notifications_key;
                $user->language=$request->language ?? $user->language;


                $user->save();
                $user->is_social = 0;






                return __success($user, 200);
            }

                return __success([
                    'api_token'      => Auth::user()->api_token,
                    'activation_key' => Auth::user()->activation_key,
                    'role'  =>Auth::user()->role,
                    'verified'=> Auth::user()->verified,
                    'status_image' => Auth::user()->status_image,
                    'status' =>'not Active',

                 ], 200);






        }catch(Exception $e){
         return __error('unauthorized', 200);


        }


    }



    public function logout(Request $request)
    {
        $user                    = $request->user();
        $user->api_token         = NULL;
        // $user->notifications_key = NULL;
        $user->save();

        return __success([
            'title'     => trans('api.logout'),
            'time'      => $this->time,
            'timestamp' => $this->timestamp,
        ], 200);
    }

    public function verifiyPhone(Request $request)
    {
        $key  = $request->activation_key;
        $user = User::where([
            ['id', Auth::id()],
            ['activation_key', $key]
        ])->first();

        if (!$user) {
            return __error(trans('api.activation_failed'), 200);
        } else {
            $user->verified          = true;
            $user->phone_verified_at = Carbon::now();
            $user->save();

            return __success($user, 200);
        }
    }

    public function resendActivationCode()
    {
        $user = User::where('id', Auth::id())->first();
        if (!$user) {
            return __error('unauthorized', 200);
        }

        $user->activation_key = random_int(10000, 99999);
        $user->save();

        #TODO: Sms Verification Code
        $this->sendSMS($user->phone , $user->activation_key);
        return __success([
            'title'     => trans('api.activation_resent'),
            'time'      => $this->time,
            'timestamp' => $this->timestamp,
        ], 200);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', new DisposableEmail()],
            'phone' => ['required', new PhoneNumber()],
        ]);

        if ($validator->fails()) {
            return __error($validator->errors()->all()[0], 200);
        }

        $user = User::where([
            ['email', $request->email],
            ['phone', $request->phone],
        ])->first();

        if (!$user) {
            return __error(trans('api.password_reset_failed'), 200);
        }

        $new_password   = random_int(10000000, 99999999);
        $user->password = bcrypt($new_password);
        $user->save();

        #TODO: SMS Password Reset
        $this->sendSMS($user->phone ,'' , 'password' , $new_password);
        #send mail

        Mail::to($user->email)
            ->send(new ResetPassword($new_password));
        return __success(trans('api.password_reset_success'), 200);
    }


    // language
    public function setLanguage(Request $request){

        $changeLanguage = User::where('id' , $request->user()->id)->update([
            'language' => $request->language
        ]);
        if ($changeLanguage){
            return __success(trans('api.language_reset_success'), 200);
        }else{
            return __error(trans('api.language_reset_failed'), 200);
        }
    }


    protected function sendSMS($phone, $activation_key , $type='key' , $password='')
    {


        $phone = "" . $phone;
        if ($type == 'key'){
            $message = "+كود+التفعيل+الخاص+بك+هو" . $activation_key ."+". "👍";
        }else if($type == 'password'){
            $message = "+كلمة+المرور+الجديدة+الخاصة+بك+هي" . $password."+". "👍";
        }

        // "https://dashboard.mobile-sms.com/api/sms/send?api_key=N1kxRFJiaUhQQWtnekxwUGt6RGxwWFh0dVlXTjNZUWVPeEtYREhLdE5SbDVhRkhJUVJGRVdnSVBTWTVx5eb3d8805bcc8&name=HomeFix&message=".$message."&numbers=".$number."&sender=HomeFix%20App&language=ar"
       // $c = curl_init("https://dashboard.mobile-sms.com/api/sms/send?api_key=N1kxRFJiaUhQQWtnekxwUGt6RGxwWFh0dVlXTjNZUWVPeEtYREhLdE5SbDVhRkhJUVJGRVdnSVBTWTVx5eb3d8805bcc8&name=HomeFix&message=".$message."&numbers=".$phone."&sender=HomeFix%20App&language=ar");
        $ch = curl_init("https://dashboard.mobile-sms.com/api/sms/send?api_key=dkVlUUJHRlBCZGlZdWhOZ1NieEduYVo3eGd6R0ozTW0xbEl2aEJRNmZkZENJWTZxNnFGelZJQ3MzWGcy5f62148cec25a&name=HomeFix&message=Your%20Activation%20Key%20Is%20".$message."&numbers=".$phone."&sender=HomeFix%20App&language=en");



        curl_setopt_array($ch, array(
            CURLOPT_POST => false,
            CURLOPT_RETURNTRANSFER => TRUE
        ));

        // curl_setopt_array($c, array(
        //     CURLOPT_POST => false,
        //     CURLOPT_RETURNTRANSFER => TRUE
        // ));

        // $response = curl_exec($c);
        // return $response;

        $response = curl_exec($ch);
        return $response;

        if ($response === FALSE) {
            return 0;
        }






/*        curl_setopt_array($ch, array(
            CURLOPT_POST => false,
            CURLOPT_RETURNTRANSFER => TRUE
        ));




        $response = curl_exec($ch);
        return $response;

        if ($response === FALSE) {
            return 0;
        }*/

        // try {
        //     $twilio = new Client($this->sid, $this->token);

        //     $message = $twilio->messages
        //         ->create(/*to*/ $phone,
        //             array(
        //                 'body' => 'Your verification code is: ' . $activation_key . '👍',
        //                 'from' => env('TWILIO_NUMBER')
        //             )
        //         );

        //     return __success($message->sid, 200);
        // } catch (Exception $e) {
        //     return __error('unauthorized', 200);
        // }
    }


  ///set_device_token

  public function setnotifications_key(Request $request )
  {



    try{
        $user = User::where([
            ['id', $request->user_id]
        ])->first();

        $user->notifications_key= $request->notifications_key ?? $user->notifications_key;
       $user->update();

        return __success($user, 200);
   }catch (Exception $e) {
     return __error('error', 200);
    }


  }

public function WorkerRegisterNotification(Request $request){

    $data = [
        'id'  => $request->id,
        'username' => $request->name,
        'avatar' => $request->avatar,
        'type' => 'new_worker',
    ];
    User::find(1)->notify(new WorkerRegisterNotification($data));
 return response()->json($data,200);


}


public function createAvatar(Request $request){

    $this->createPlaceHolderAvatar($request->id, $request->name);


}


}


