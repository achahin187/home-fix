<?php

namespace App\Http\Controllers;
use Auth;

class HomeController extends Controller
{
    /**
     * @return mixed
     */
    public function index()
    {
        return view('index');
      
    }
}
