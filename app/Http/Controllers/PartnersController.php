<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Partners;
use Avatar;
use Exception;
use File;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Storage;


class PartnersController extends Controller
{
    protected $mainTitle;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin']);
        $this->mainTitle = trans('admin.Partners');
    }

    /**
     * Display a listing of the Slider.
     *
     * @return Response
     */
    public function index()
    {
        return view('partners.list', [
            'mainTitle' => $this->mainTitle,
            'title'     => $this->mainTitle,
            'sliders'    => Partners::all(),
        ]);
    }

    /**
     * Show the form for creating a new Slider.
     *
     * @return Response
     */
    public function create()
    {
        return view('partners.add', [
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.add_Partners'),
        ]);
    }

    /**
     * Store a newly created Partners in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'image'          => 'required|image',
 
        ]);

        $Slider  = new Partners();
        
        if ($request->file('image')) {
            
            $iamge          = $request->file('image');
            
          //  dd($iamge);
            $slider_fileName = uniqid() . '.' . $iamge->getClientOriginalExtension();
            Storage::disk('uploads')
                ->putFileAs('partners/' . $Slider->id, $iamge, $slider_fileName);

           // @unlink(base_path($Slider->image));

            $Slider->image = $slider_fileName;
            $Slider->save();

        }



        $Slider->save();

        /*$workers = $Slider->category()
            ->first()->workers()
            ->get();

        $Slider->workers()->attach($workers);*/



        $request->session()->flash('success',
            trans('admin.Partners_added'));
        return redirect()->route('partners.index');
    }

    /**
     * Display the specified Slider.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $slider = Partners::FindOrfail($id);

        if ($slider === null) {
            return $this->_404(
                trans('admin.Partner_notfound'),
                $this->mainTitle, 'partners.index'
            );

        }

        //dd($slider->title_en);

        return view('partners.view', [
            'mainTitle' => $this->mainTitle,
            'slider'    => $slider,
            'title'     => trans('admin.view_Partner')
                
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

        $Slider      = Partners::where('id', $id)->first();

        if ($Slider === null) {
            return $this->_404(
                trans('admin.Partner_notfound'),
                $this->mainTitle, 'partners.index'
            );
        }

        return view('partners.edit', [
            'slider'      => $Slider,
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.edit_Partner') . ' ( ' . $Slider->id . ' )',
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
        $Slider = Partners::find($id);

        $request->validate([

            'image'          => 'required|image',
        ]);

        $Slider->save();

        if ($request->file('image')) {
            $iamge          = $request->file('image');
            $slider_fileName = uniqid() . '.' . $iamge->getClientOriginalExtension();
            Storage::disk('uploads')
                ->putFileAs('partners/' . $Slider->id, $iamge, $slider_fileName);

           // @unlink(base_path($Slider->image));

            $Slider->image = $slider_fileName;
            $Slider->save();
        }

        $request->session()->flash('success',
            trans('admin.Partner_updated'));
        return redirect()->route('partners.index');
    }

    /**
     * Remove the specified Slider from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        if (Partners::find($id)->delete()) {
            return response()->json('success', 200);
        }
    }
}
