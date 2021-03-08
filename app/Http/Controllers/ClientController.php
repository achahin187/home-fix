<?php

namespace App\Http\Controllers;

use App\Country;
use App\Rules\DisposableEmail;
use App\Rules\Password;
use App\Rules\PhoneNumber;
use App\User;
use App\UserAddress;
use Avatar;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Storage;

class ClientController extends Controller
{
    protected $mainTitle;


    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin']);
        $this->mainTitle = trans('admin.client_management');
    }

    /**
     * Display a listing of the client.
     *
     * @return Response
     */
    public function index()
    {
        $clients = User::with('clientOrders')
            ->where('role', 'client')->get();

        return view('clients.list', [
            'mainTitle' => $this->mainTitle,
            'title'     => $this->mainTitle,
            'clients'   => $clients,
        ]);
    }

    /**
     * Show the form for creating a new client.
     *
     * @return Response
     */
    public function create()
    {
        $countries = Country::where([
            ['status', true]
        ])->get();

        return view('clients.add', [
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.add_client'),
            'countries' => $countries,
        ]);
    }

    /**
     * Store a newly created client in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string',
            'email'    => 'required|string|email|unique:users',
            'phone'    => 'required|string|unique:users',
            'country'  => 'required|string',
            'city'     => 'required|string',
            'address'  => 'required|string',
            'password' => ['required', 'confirmed', new Password(8)],
            'image'    => 'mimes:jpeg,jpg,png',
        ]);

        $user = new User([
            'name'              => $request->name,
            'email'             => $request->email,
            'phone'             => $request->phone,
            'address'           => $request->address,
            'password'          => bcrypt($request->password),
            'activation_key'    => random_int(10000, 99999),
            'phone_verified_at' => Carbon::now(),
            'role'              => 'client',
            'verified'          => true,
        ]);

        $user->save();

        $user_address = new UserAddress([
            'user_id'    => $user->id,
            'country_id' => $request->country,
            'city_id'    => $request->city,
            'area'       => $request->address,
        ]);
        $user_address->save();

        if ($request->file('image')) {
            $avatar = $request->file('image');
            Storage::disk('uploads')
                ->putFileAs('avatars/' . $user->id, $avatar, 'avatar.png');
                $user->update([
                    'status_image' => 1
                ]);
        } else {
            $this->createPlaceHolderAvatar($user->id, $user->name);
        }

        $request->session()->flash('success', trans('admin.client_added'));
        return redirect()->route('clients.index');
    }

    /**
     * Display the specified client.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $user = User::where('id', $id)
            ->with('clientOrders')
            ->first();
        if ($user === null) {
            return $this->_404(
                trans('admin.client_notfound'),
                $this->mainTitle, 'clients.index'
            );
        }

        $totalOrderPrice = array_sum(array_column(json_decode($user->clientOrders), 'total_price'));
        return view('clients.view', [
            'client'          => $user,
            'totalOrderPrice' => $totalOrderPrice,
            'mainTitle'       => $this->mainTitle,
            'title'           => trans('admin.view_client') . ' ( ' . $user->name . ' )',
        ]);

    }

    /**
     * Show the form for editing the specified client.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        $countries = Country::where([
            ['status', true]
        ])->get();

        $user = User::where('id', $id)
            ->first();
        if ($user === null) {
            return $this->_404(
                trans('admin.client_notfound'),
                $this->mainTitle, 'clients.index'
            );
        }

        return view('clients.edit', [
            'client'    => $user,
            'countries' => $countries,
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.client_edit') .
                ' ( ' . $user->id . ' )',
        ]);
    }

    /**
     * Update the specified client in storage.
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
            'name'     => 'string',
            'email'    => $email,
            'phone'    => $phone,
            'address'  => 'string',
            'password' => 'confirmed',
            'image'    => 'mimes:jpeg,jpg,png',
        ]);

        $user->name     = ($request->name) ?: $user->name;
        $user->email    = ($request->email) ?: $user->email;
        $user->phone    = ($request->phone) ?: $user->phone;
        $user->address  = ($request->address) ?: $user->address;
        $user->password = ($request->password)
            ? bcrypt($request->password)
            : $user->password;

        $user->verified = ($request->verified);
        $user->ban      = ($request->ban) ?: $user->ban;

        if ($request->file('image')) {
            $avatar = $request->file('image');
            Storage::disk('uploads')
                ->putFileAs('avatars/' . $user->id, $avatar, 'avatar.png');
                $user->update([
                    'status_image' => 1
                ]);
        }

        $user->save();

        if (isset($request->city)
            && isset($request->country)) {
            UserAddress::where(
                'user_id', $user->id
            )->update([
                'user_id'    => $user->id,
                'country_id' => $request->country,
                'city_id'    => $request->city,
                'area'       => $request->address,
            ]);
        }

        $request->session()->flash('success',
            trans('admin.client_updated'));

        return redirect()->route('clients.index');
    }

    /**
     * Remove the specified client from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        if (User::find($id)->delete()) {
            return response()->json('success', 200);
        } else {
            return response()->json('error', 200);
        }
    }
}
