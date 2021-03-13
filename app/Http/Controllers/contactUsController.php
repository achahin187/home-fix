<?php

namespace App\Http\Controllers;

use App\contactUs;
use Illuminate\Http\Request;

class contactUsController extends Controller
{


    protected $mainTitle;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin|manager']);
        $this->mainTitle = trans('admin.contactus');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contacts = contactUs::all();


        return view('contactsUs.list', [
            'mainTitle' => $this->mainTitle,
            'title'     => $this->mainTitle,
        ],compact('contacts'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return abort(404);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return abort(404);

    }

    public function destroy($id)
    {
        if (contactUs::find($id)->delete()) {
            return response()->json('success', 200);
        }
        return response()->json('error', 200);
    }
 

 

}
