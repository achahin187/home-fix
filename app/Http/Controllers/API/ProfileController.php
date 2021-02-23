<?php

namespace App\Http\Controllers\API;

use App\ActiveCrane;
use App\Http\Controllers\Controller;
use App\Rules\DisposableEmail;
use App\Rules\Password;
use App\Rules\PhoneNumber;
use App\User;
use App\UserAddress;
use Avatar;
use Illuminate\Http\File;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Storage;
use Validator;

class ProfileController extends Controller
{
    public function getUserInformation(Request $request)
    {
        return __success(Auth::user(), 200);
    }

    public function setUserInformation(Request $request)
    {
        $email = ['required', 'email', new DisposableEmail()];
        $phone = ['required', new PhoneNumber()];

        if (Auth::user()->email !== $request->email) {
            $email[] = 'unique:users';
        }
        if (Auth::user()->phone !== $request->phone) {
            $phone[] = 'unique:users';
        }

        $validator = Validator::make($request->all(), [
            'name'     => 'string',
            'email'    => $email,
            'phone'    => $phone,
            'address'  => 'string',
            'area'     => 'string',
            'cv'       => 'mimes:pdf,doc,docx',
            'identity' => 'image',
        ]);

        if ($validator->fails()) {
            return __error($validator->errors()->all()[0], 200);
        }

        $user = User::find(Auth::id());

        $user->name    = ($request->name) ?: $user->name;
        $user->email   = ($request->email) ?: $user->email;
        $user->phone   = ($request->phone) ?: $user->phone;
        $user->address = ($request->address) ?: $user->address;

        if ($request->phone !== $user->phone) {
            $user->verified          = false;
            $user->phone_verified_at = NULL;

            #TODO: SMS Verification Code
        }

        $user->save();

        $user_address = UserAddress::where(
            'user_id', Auth::id()
        )->first();

        if ($user_address !== null) {
            $user_address->area = $request->area
                ?? $user_address->area;

            $user_address->save();
        }

        if ($request->file('cv')) {
            $cv          = $request->file('cv');
            $cv_fileName = uniqid() . '.' . $cv->getClientOriginalExtension();
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
                ->putFileAs('CVs/' . $user->id, $identity, $identity_fileName);

            @unlink(base_path($user->id_path));

            $user->identity = $identity_fileName;
            $user->save();
        }

        return __success($user, 200);
    }

    public function setUserAvatar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'avatar' => 'image',
        ]);

        if ($validator->fails()) {
            return __error($validator->errors()->all()[0], 200);
        }

        $user = User::find(Auth::id());

        if ($request->file('avatar')) {
            $avatar = $request->file('avatar');


            Storage::disk('uploads')->putFileAs('avatars/' . $user->id, $avatar, 'avatar.jpg');
        }

        return __success($user, 200);
    }

    public function setUserPassword(Request $request)
    {
        $user = User::find(Auth::id());

        $validator = Validator::make($request->all(), [
            'password' => ['confirmed', new Password(8)],
        ]);

        if ($validator->fails()) {
            return __error($validator->errors()->all()[0], 200);
        }

        if (Hash::check($request->current_password, $user->password)) {
            $user->password = Hash::make($request->password);
            $user->save();

            return __success($user, 200);
        } else {
            return __error(trans('api.wrong_current_password'), 200);
        }
    }

    public function setUserLocation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'latitude'  => 'string',
            'longitude' => 'string',
        ]);

        if ($validator->fails()) {
            return __error($validator->errors()->all()[0], 200);
        }

        try {
            $user = User::where([
                ['id', Auth::id()]
            ])->first();

            $user->latitude  = $request->latitude ?? $user->latitude;
            $user->longitude = $request->longitude ?? $user->longitude;
            $user->save();

            return __success('success', 200);
        } catch (Exception $e) {
            return __error('error', 200);
        }
    }
    
    
    ///update country and city
  public function setCountry(Request $request)
    {



        try {
            $user = User::find(Auth::id());
            $user_address = UserAddress::where('user_id', Auth::id())->first();




            $user_address = UserAddress::where('user_id', $user->id)->update([
                'country_id' => $request->country_id,
                'city_id'    => $request->city_id,
                'area'       => $request->area,

            ]);




            return __success($user, 200);
        } catch (Exception $e) {
            return __error('error', 200);
        }
        
    }
}
