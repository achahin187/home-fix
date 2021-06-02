<?php

namespace App\Http\Controllers;

use App\Technical;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class TechnicalsController extends Controller
{
    protected $mainTitle;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin']);
        $this->mainTitle = trans('admin.technical_management');
    }

    /**
     * Display a listing of the service.
     *
     * @return Response
     */
    public function index()
    {
       

        return view('technicals.list', [
            'mainTitle'   => $this->mainTitle,
            'title'       => $this->mainTitle,
            'technicals'  => Technical::whereType(1)->get(),
            'description' => Technical::whereType(0)->first()
        ]);
    }

     /**
     * Show the form for creating a new Slider.
     *
     * @return Response
     */
    public function create()
    {
        return view('technicals.add', [
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.add'),
        ]);
    }

    /**
     * Store a newly created Slider in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'ar_title'        => 'required|string',
            'en_title'        => 'required|string',
            'tr_title'        => 'required|string',
            'en_section'         => 'required|string',
            'ar_section'         => 'required|string',
            'tr_section'         => 'required|string',
        ]);

        $technical  = new Technical([
            'ar_title'        => $request->ar_title,
            'en_title'        => $request->en_title,
            'tr_title'        => $request->tr_title,
            'en_section'      => $request->en_section,
            'ar_section'      => $request->ar_section,
            'tr_section'      => $request->tr_section
        ]);
        $technical->save();

        $request->session()->flash('success',
            trans('admin.technical_added'));
        return redirect()->route('technicals.index');
    }

    /**
     * Display the specified service.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $technical = Technical::FindOrfail($id);

        if ($technical === null) {
            return $this->_404(
                trans('admin.technical_notfound'),
                $this->mainTitle, 'technicals.index'
            );

        }

        //dd($slider->title_en);

        return view('technicals.view', [
            'mainTitle' => $this->mainTitle,
            'technical'    => $technical,
            'title'     => trans('admin.view_technical')
                
        ]);
    }

     /**
     * Show the form for editing the specified Slider.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {

        $technical = Technical::where('id', $id)->first();

        if ($technical === null) {
            return $this->_404(
                trans('admin.technical_notfound'),
                $this->mainTitle, 'technicals.index'
            );
        }

        return view('technicals.edit', [
            'technical'      => $technical,
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.edit_technical') . ' ( ' . $technical->id . ' )',
        ]);
    }

    /**
     * Update the specified Slider in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {

        $technical = Technical::find($id);

        if ( $technical->type == 1) {
            $request->validate([
                'ar_title'        => 'required|string',
                'en_title'        => 'required|string',
                'tr_title'        => 'required|string',
                'en_section'      => 'required|string',
                'ar_section'      => 'required|string',
                'tr_section'      => 'required|string',
            ]);
        }else {
            $request->validate([
                'ar_description'        => 'required|string',
                'en_description'        => 'required|string',
                'tr_description'        => 'required|string',
            ]);
        }
        


        $technical->ar_title        = $request->ar_title;
        $technical->en_title        = $request->en_title;
        $technical->tr_title        = $request->tr_title;
        $technical->en_section      = $request->en_section;
        $technical->ar_section      = $request->ar_section;
        $technical->tr_section      = $request->tr_section;
        $technical->ar_description      = $request->ar_description;
        $technical->en_description      = $request->en_description;
        $technical->tr_description      = $request->tr_description;

        $technical->save();

        

        $request->session()->flash('success',
            trans('admin.edit_technical'));
        return redirect()->route('technicals.index');
    }

    /**
     * Remove the specified Slider from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        if (Technical::find($id)->delete()) {
            return response()->json('success', 200);
        }
    }

    

    
}
