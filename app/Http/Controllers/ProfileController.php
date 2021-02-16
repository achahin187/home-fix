<?php

namespace App\Http\Controllers;

use App\Rules\DisposableEmail;
use App\Rules\PhoneNumber;
use App\User;
use Avatar;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Storage;

class ProfileController extends Controller
{
    protected $mainTitle;


    public function __construct()
    {
        parent::__construct();
        $this->middleware('auth');
    }

    /**
     * Show the form for editing the authenticated user.
     *
     * @param int $id
     * @return Response
     */
    public function profile()
    {
        $user = User::where('id', Auth::id())
            ->first();

        return view('users.profile', [
            'user'      => $user,
            'mainTitle' => trans('admin.update_profile'),
            'title'     => trans('admin.update_profile'),
        ]);
    }


    /**
     * Update the authenticated user data.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function updateProfile(Request $request, $id)
    {
        $user = User::find($id);

        $email = ['email', new DisposableEmail()];
        $phone = [new PhoneNumber()];

        if ($user->email !== $request->email) {
            $email[] = 'unique:users';
        }
        if ($user->phone !== $request->phone) {
            $phone[] = 'unique:users';
        }

        $request->validate([
            'name'    => 'string',
            'email'   => $email,
            'phone'   => $phone,
            'address' => 'string',
            'image'   => 'image',
        ]);

        $user->name     = ($request->name) ?: $user->name;
        $user->email    = ($request->email) ?: $user->email;
        $user->phone    = ($request->phone) ?: $user->phone;
        $user->address  = ($request->address) ?: $user->address;
        $user->password = ($request->password)
            ? bcrypt($request->password)
            : $user->password;

        if ($request->file('image')) {
            $avatar = $request->file('image');
            Storage::disk('uploads')->putFileAs('avatars/' . $user->id,
                $avatar, 'avatar.png');
        }

        $user->save();

        $request->session()->flash('success',
            trans('admin.profile_update_success'));
        return redirect()->route('profile');
    }
}
