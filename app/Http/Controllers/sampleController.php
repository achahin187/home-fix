<?php

namespace App\Http\Controllers;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\categoryExport;
use App\Exports\subcategoryExport;



use Illuminate\Http\Request;

class sampleController extends Controller
{
    


    public function index(){
        return view('sample.index');
    }



    public function category() 
{
    return Excel::download(new categoryExport, 'categories.csv');
}

public function subcategory() 
{
    return Excel::download(new subcategoryExport, 'subcategories.csv');
}


}
