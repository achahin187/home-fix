<?php

namespace App\Http\Controllers;

use App\Role;
use App\Rules\DisposableEmail;
use App\Rules\Password;
use App\Rules\PhoneNumber;
use App\User;
use Avatar;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Storage;

class UserController extends Controller
{
    protected $mainTitle;


    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin'])
            ->except('ban', 'verify');
        $this->mainTitle = trans('admin.user_management');
    }

    /**
     * Display a listing of the user.
     *
     * @return Response
     */
    public function index()
    {
        $user = User::where('role', 'admin')
            ->orWhere('role', 'super-admin')
            ->orWhere('role', 'manager');

        return view('users.list', [
            'mainTitle' => $this->mainTitle,
            'title'     => $this->mainTitle,
            'users'     => $user->get(),
        ]);
    }

    /**
     * Show the form for creating a new user.
     *
     * @return Response
     */
    public function create()
    {
        return view('users.add', [
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.add_user'),
        ]);
    }

    /**
     * Store a newly created user in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string',
            'email'    => ['required', 'email', 'unique:users', new DisposableEmail()],
            'phone'    => ['required', 'unique:users', new PhoneNumber()],
            'address'  => 'string',
            'password' => ['required', 'confirmed', new Password(8)],
            'image'    => 'image',
            'role'     => 'in:admin,super-admin,manager',
        ]);

        $user = new User([
            'name'              => $request->name,
            'email'             => $request->email,
            'phone'             => $request->phone,
            'address'           => $request->address,
            'notes'             => $request->notes ?: "",
            'password'          => bcrypt($request->password),
            'role'              => $request->role,
            'activation_key'    => random_int(10000, 99999),
            'phone_verified_at' => Carbon::now(),
            'verified'          => true,
        ]);

        $user->save();

        $role = Role::where(
            'slug',
            $request->role
        )->first();

        $user->roles()->detach();
        $user->roles()->attach($role);

        if ($request->file('image')) {
            $avatar = $request->file("image");
            Storage::disk("uploads")->putFileAs('avatars/' . $user->id, $avatar, 'avatar.png');
        } else {
            $this->createPlaceHolderAvatar($user->id, $user->name);
        }

        $request->session()->flash(
            'success',
            trans('admin.user_add_success')
        );
        return redirect()->route('users.index');
    }

    /**
     * Display the specified user.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $user = User::where('id', $id)->first();
        if (!$user) {
            return $this->_404(
                trans('admin.user_notfound'),
                $this->mainTitle,
                'users.index'
            );
        }

        return view('users.view', [
            'user'      => $user,
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.view_user') . ' ( ' . $user->name . ' )',
        ]);
    }

    /**
     * Show the form for editing the specified user.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        $user = User::where('id', $id)
            ->first();
        if (!$user) {
            return $this->_404(
                trans('admin.user_notfound'),
                $this->mainTitle,
                'users.index'
            );
        }

        return view('users.edit', [
            'user'      => $user,
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.edit_user') . ' ( ' . $user->id . ' )',
        ]);
    }

    /**
     * Update the specified user in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
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
            'role'    => 'in:admin,super-admin,manager',
        ]);

        $user->name     = ($request->name) ?: $user->name;
        $user->email    = ($request->email) ?: $user->email;
        $user->phone    = ($request->phone) ?: $user->phone;
        $user->address  = ($request->address) ?: $user->address;
        $user->role     = ($request->role) ?: $user->role;
        $user->notes    = ($request->notes) ?: $user->notes;
        $user->password = ($request->password)
            ? bcrypt($request->password)
            : $user->password;

        $user->verified = ($request->verified) ?: $user->verified;
        $user->ban      = ($request->ban) ?: $user->ban;

        if ($request->file('image')) {
            $avatar = $request->file('image');
            Storage::disk('uploads')->putFileAs(
                'avatars/' . $user->id,
                $avatar,
                'avatar.png'
            );
        }

        $user->save();

        $role = Role::where(
            'slug',
            $request->role
        )->first();
        $user->roles()->detach();
        $user->roles()->attach($role);

        $request->session()->flash(
            'success',
            trans('admin.user_update_success')
        );
        return redirect()->route('users.index');
    }

    /**
     * Remove the specified user from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        if (User::find($id)->delete()) {
            return response()->json("success", 200);
        }
    }

    /**
     * Ban / Unban the specified user.
     *
     * @param int $id
     * @return Response
     */
    public function ban($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json('error', 200);
        }
        $user->ban = !$user->ban;
        if ($user->save()) {
            return response()->json('success', 200);
        }
    }

    /**
     * Verify / Unverify the specified user.
     *
     * @param int $id
     * @return Response
     */
    public function verify($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json('error', 200);
        }
        $user->verified = !$user->verified;
        if ($user->save()) {
            return response()->json('success', 200);
        }
    }
}
