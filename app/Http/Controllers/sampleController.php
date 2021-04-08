<?php

namespace App\Http\Controllers;

use Maatwebsite\Excel\Facades\Excel;
use App\Exports\categoryExport;
use App\Exports\subcategoryExport;
use App\Exports\countryExport;
use App\Country;
use Illuminate\Http\Request;



class sampleController extends Controller
{



    public function index()
    {
        $countries = Country::with('cities')->get();

        return view('sample.index', compact('countries'));
    }


    public function export_country(Request $request)
    {
       $country=Country::where('id', '=', $request->id)->first();


        return Excel::download(new countryExport($request->id), $country->name_en.'.xlsx');
    }


    public function category()
    {
        return Excel::download(new categoryExport, 'categories.xlsx');
    }

    public function subcategory()
    {
        return Excel::download(new subcategoryExport, 'subcategories.xlsx');
    }
}
