<?php

namespace App\Http\Controllers;

use App\City;
use App\Country;
use App\CountryNote;
use App\CountryService;
use App\CountryTracking;
use Avatar;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Storage;

class CountryController extends Controller
{
    protected $mainTitle;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin']);
        $this->mainTitle = trans('admin.country_management');
    }

    /**
     * Display a listing of the country.
     *
     * @return Response
     */
    public function index()
    {
        $countries = Country::with('cities')->get();

        return view('countries.list', [
            'mainTitle' => $this->mainTitle,
            'title'     => $this->mainTitle,
            'countries' => $countries,
        ]);
    }

    /**
     * Show the form for creating a new country.
     *
     * @return Response
     */
    public function create()
    {
        return view('countries.add', [
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.add_country'),
        ]);
    }

    /**
     * Store a newly created country in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'     => ['required', 'min:2', 'max:60', 'not_regex:([0-9])'],
            'currency' => ['required', 'min:2', 'max:60', 'not_regex:([0-9])'],
            'max_length' => 'required|integer|min:1|max:100',
        ]);

        $country = new Country([
            'name'     => $request->name,
            'currency' => $request->currency,
            'max_length' => $request->max_length, 
        ]);

        $country->save();

        $request->session()->flash('success',
            trans('admin.country_add_success'));
        return redirect()->route('countries.index');
    }

    /**
     * Display the specified country.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $country = Country::where('id', $id)
            ->with('cities')->first();

        if (!$country) {
            return $this->_404(
                trans('admin.country_notfound'),
                $this->mainTitle,
                'countries.index'
            );
        }

        return view('countries.view', [
            'country'   => $country,
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.view_country') .
                ' ( ' . $country->name . ' )',
        ]);
    }

    /**
     * Show the form for editing the specified country.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        $country = Country::find($id);

        return view('countries.edit', [
            'country'   => $country,
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.edit_country') .
                ' ( ' . $country->name . ' )',
        ]);
    }

    /**
     * Update the specified country in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $country = Country::find($id);
        $countries = Country::with('cities')->get();


        $request->validate([
            'name'     => ['required', 'min:2', 'max:60', 'not_regex:([0-9])'],
            'currency' => ['required', 'min:2', 'max:60', 'not_regex:([0-9])'],
            'max_length' => 'required|integer|min:1|max:100',
        ]);

        $country->name     = $request->name;
        $country->currency = $request->currency;
        $country->max_length = $request->max_length;
        $country->save();

        $request->session()->flash(
            'success',
            trans('admin.country_update_success')
        );
        return view('countries.list', [
            'mainTitle' => $this->mainTitle,
            'title'     => $this->mainTitle,
            'countries' => $countries,
        ]);  
    
    }

    /**
     * Update the specified city in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function updateCity(Request $request, $id)
    {
        $city = City::find($id);

        $request->validate([
            'name' => 'required',
        ]);

        $city->name = $request->name;
        $city->save();

        $request->session()->flash(
            'success',
            trans('admin.city_update_success')
        );
        return redirect()->back();
    }

    /**
     * Remove the specified country from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        if (Country::find($id)->delete()) {
            return response()->json('success', 200);
        }
        return response()->json('error', 200);
    }

    /**
     * Change the specified country status.
     *
     * @param int $id
     * @return Response
     */
    public function active($id)
    {
        $country = Country::where(
            'id', $id
        )->first();

        $country->status = !$country->status;

        if ($country->save()) {
            return response()->json('success', 200);
        }
        return response()->json('error', 200);
    }

    /**
     * Add city to storage.
     *
     * @return Response
     */
    public function addNewCity(Request $request, $id)
    {
        $city = new City([
            'name'       => $request->name,
            'country_id' => $id
        ]);
        $city->save();

        $request->session()->flash(
            'success',
            trans('admin.city_add_success')
        );
        return redirect()->back();
    }

    /**
     * Remove the specified city from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroyCity($id)
    {
        if (City::find($id)->delete()) {
            return response()->json('success', 200);
        }
        return response()->json('error', 200);
    }


    /**
     * Change the specified city status.
     *
     * @param int $id
     * @return Response
     */
    public function activeCity($id)
    {
        $city = City::where(
            'id', $id
        )->first();

        $city->status = !$city->status;

        if ($city->save()) {
            return response()->json('success', 200);
        }
        return response()->json('error', 200);
    }

    public function getCitiesByCountry($id)
    {

        $cities = Country::where('id', $id)
            ->first();
        $cities = $cities
            ? $cities->cities()->get()
            : [];

        return response()->json($cities, 200);
    }
}
