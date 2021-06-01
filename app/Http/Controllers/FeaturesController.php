<?php

namespace App\Http\Controllers;

use App\Feature;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Storage;
use File;

class FeaturesController extends Controller
{
    protected $mainTitle;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin']);
        $this->mainTitle = trans('admin.features_management');
    }

    /**
     * Display a listing of the service.
     *
     * @return Response
     */
    public function index()
    {
       

        return view('features.list', [
            'mainTitle' => $this->mainTitle,
            'title'     => $this->mainTitle,
            'features'  => Feature::get()
        ]);
    }


    /**
     * Display the specified service.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $feature = Feature::FindOrfail($id);

        if ($feature === null) {
            return $this->_404(
                trans('admin.feature_notfound'),
                $this->mainTitle, 'features.index'
            );

        }

        //dd($slider->title_en);

        return view('features.view', [
            'mainTitle' => $this->mainTitle,
            'feature'    => $feature,
            'title'     => trans('admin.view_feature')
                
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

        $feature      = Feature::where('id', $id)->first();

        if ($feature === null) {
            return $this->_404(
                trans('admin.feature_notfound'),
                $this->mainTitle, 'features.index'
            );
        }

        return view('features.edit', [
            'feature'      => $feature,
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.edit_feature') . ' ( ' . $feature->id . ' )',
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

        $feature = Feature::find($id);

        $request->validate([
            'ar_title'        => 'required|string',
            'en_title'        => 'required|string',
            'tr_title'        => 'required|string',
            'en_section'         => 'required|string',
            'ar_section'         => 'required|string',
            'tr_section'         => 'required|string',
            'image'          => 'mimes:jpeg,jpg,png',
        ]);


        $feature->ar_title        = $request->ar_title;
        $feature->en_title        = $request->en_title;
        $feature->tr_title        = $request->tr_title;
        $feature->en_section      = $request->en_section;
        $feature->ar_section      = $request->ar_section;
        $feature->tr_section      = $request->tr_section;

        $feature->save();

        if ($request->file('image')) {
            $iamge          = $request->file('image');
            $feature_fileName = uniqid() . '.' . $iamge->getClientOriginalExtension();
            Storage::disk('uploads')
            ->putFileAs('features/' . $feature->id, $iamge, $feature_fileName);

            $feature->image = $feature_fileName;
            $feature->save();
        }

        $request->session()->flash('success',
            trans('admin.feature_updated'));
        return redirect()->route('features.index');
    }

    

    
}
