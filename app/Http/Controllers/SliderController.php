<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\NotificationType;
use App\Slider;
use App\Order;
use App\User;
use Avatar;
use Exception;
use File;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Storage;


class SliderController extends Controller
{
    
    protected $mainTitle;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin']);
        $this->mainTitle = trans('admin.slider');
    }

    /**
     * Display a listing of the Slider.
     *
     * @return Response
     */
    public function index()
    {
        return view('sliders.list', [
            'mainTitle' => $this->mainTitle,
            'title'     => $this->mainTitle,
            'sliders'    => Slider::all(),
        ]);
    }

    /**
     * Show the form for creating a new Slider.
     *
     * @return Response
     */
    public function create()
    {
        return view('sliders.add', [
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.add_Slider'),
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
            'title_en'        => 'required|string',
            'title_ar'        => 'required|string',
            'title_tr'        => 'required|string',
            'text_en'         => 'required|string',
            'text_ar'         => 'required|string',
            'text_tr'         => 'required|string',
            'image'          => 'required|mimes:jpeg,jpg,png',
 
        ]);

        $Slider  = new Slider([
            'title_en'        => $request->title_en,
            'title_ar'        => $request->title_ar,
            'title_tr'        => $request->title_tr,

            'text_en'        => $request->text_en,
            'text_ar'        => $request->text_ar,
            'text_tr'        => $request->text_tr,

        ]);
        
        if ($request->file('image')) {
            $iamge          = $request->file('image');
            $slider_fileName = uniqid() . '.' . $iamge->getClientOriginalExtension();
            Storage::disk('uploads')
                ->putFileAs('sliders/' . $Slider->id, $iamge, $slider_fileName);

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
            trans('admin.Slider_added'));
        return redirect()->route('slider.index');
    }

    /**
     * Display the specified Slider.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $slider = Slider::FindOrfail($id);

        if ($slider === null) {
            return $this->_404(
                trans('admin.Slider_notfound'),
                $this->mainTitle, 'slider.index'
            );

        }

        //dd($slider->title_en);

        return view('sliders.view', [
            'mainTitle' => $this->mainTitle,
            'slider'    => $slider,
            'title'     => trans('admin.view_Slider')
                
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

        $Slider      = Slider::where('id', $id)->first();

        if ($Slider === null) {
            return $this->_404(
                trans('admin.slider_notfound'),
                $this->mainTitle, 'sliders.index'
            );
        }

        return view('sliders.edit', [
            'slider'      => $Slider,
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.edit_Slider') . ' ( ' . $Slider->id . ' )',
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
        $Slider = Slider::find($id);

        $request->validate([
            'title_en'        => 'required|string',
            'title_ar'        => 'required|string',
            'title_tr'        => 'required|string',
            'text_en'         => 'required|string',
            'text_ar'         => 'required|string',
            'text_tr'         => 'required|string',
            'image'          => 'required|mimes:jpeg,jpg,png',
        ]);


        $Slider->title_en        = $request->title_en;
        $Slider->title_ar        = $request->title_ar;
        $Slider->title_tr        = $request->title_tr;
        $Slider->text_en          = $request->text_en;
        $Slider->text_ar          = $request->text_ar;
        $Slider->text_tr          = $request->text_tr;

        $Slider->save();

        if ($request->file('image')) {
            $iamge          = $request->file('image');
            $slider_fileName = uniqid() . '.' . $iamge->getClientOriginalExtension();
            Storage::disk('uploads')
                ->putFileAs('sliders/' . $Slider->id, $iamge, $slider_fileName);

           // @unlink(base_path($Slider->image));

            $Slider->image = $slider_fileName;
            $Slider->save();
        }

        $request->session()->flash('success',
            trans('admin.Slider_updated'));
        return redirect()->route('slider.index');
    }

    /**
     * Remove the specified Slider from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        if (Slider::find($id)->delete()) {
            return response()->json('success', 200);
        }
    }
}
