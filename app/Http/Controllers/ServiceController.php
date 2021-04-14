<?php

namespace App\Http\Controllers;

use App\Category;
use App\Country;
use App\Service;
use App\ServicePrice;
use Avatar;
use File;
use App\Imports\serviceImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Storage;


class ServiceController extends Controller
{
    protected $mainTitle;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin']);
        $this->mainTitle = trans('admin.service_management');
    }

    /**
     * Display a listing of the service.
     *
     * @return Response
     */
    public function index()
    {
        $countries = Country::where(
            'status', true
        )->get();

        return view('services.list', [
            'mainTitle' => $this->mainTitle,
            'title'     => $this->mainTitle,
            'countries' => $countries,
            'services'  => Service::where([
                ['checkup', false],
                ['quick', false],
            ])->with('category')->get(),
        ]);
    }
 ///import services 
 public function import_services(Request $request){
     try { 

        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);
    
        $path = $request->file('file')->store('temp');
        $path=storage_path('app').'/'.$path;  
         Excel::import(new serviceImport,$path); 
        $request->session()->flash('success',trans('admin.export_services_succes'));
        return redirect()->route('services.index');
    

    } catch (\Exception $e) {

        $request->session()->flash('error','Something Went Wrong when uplode File');
        return redirect()->route('services.index');   
    
    }  

 }
 public function export_model_service() 

{
    $file_name='services.xlsx';
    $path = storage_path().'/'.'app'.'/temp/'.$file_name;
    
    if (file_exists($path)) {
       
        return response()->download($path);
    }else{
        return redirect()->back();
    }
/*     return Storage::download(storage_path().'/'.'app'.,'workers_model.xlsx');
 */}
    /**
     * Show the form for creating a new service.
     *
     * @return Response
     */
    public function create()
    {
        $countries  = Country::where(
            'status', true
        )->get();
        $services   = Service::where([
            ['checkup', false],
            ['quick', false],
        ])->with('category')->get();
        $categories = Category::where(
            'parent_id', '<>', null
        )->get();
        return view('services.add', [
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.add_service'),
            'services'   => $services,
            'categories' => $categories,
            'countries'  => $countries,
        ]);
    }

    /**
     * Store a newly created service in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name_en'  => 'required|string',
            'name_ar'  => 'required|string',
            'name_tr'  => 'required|string',
            'category' => 'required|numeric',
            'price.*'  => 'required|numeric',
        ]);

        $service = new Service([
            'name_en'     => $request->name_en,
            'name_ar'     => $request->name_ar,
            'name_tr'     => $request->name_tr,
            'category_id' => $request->category,
            'price'       => 0.00,
        ]);

        $service->save();

        $service_id = $service->id;
        ServicePrice::where(
            'service_id', $service_id
        )->delete();

        foreach ((array)$request->price as $k => $v) {
            $price = new ServicePrice([
                'service_id' => $service_id,
                'country_id' => (int)$k,
                'price'      => round((double)$v, 2)
            ]);
            $price->save();
        }

        $request->session()->flash('success',
            trans('admin.service_added'));
        return redirect()->route('services.index');
    }

    /**
     * Display the specified service.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $countries = Country::where(
            'status', true
        )->get();

        $service = Service::where('id', $id)
            ->with('category')
            ->first();
        if ($service === null) {
            return $this->_404(
                trans('admin.service_notfound'),
                $this->mainTitle, 'services.index'
            );
        }
        return view('services.view', [
            'service'   => $service,
            'countries' => $countries,
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.view_service') . ' ( ' . $service->name . ' )',
        ]);
    }

    /**
     * Show the form for editing the specified service.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        $countries = Country::where(
            'status', true
        )->get();

        $categories = Category::where(
            'parent_id', '<>', null
        )->get();
        $service    = Service::where('id', $id)
            ->with('category')->first();

        if ($service === null) {
            return $this->_404(
                trans('admin.service_notfound'),
                $this->mainTitle, 'services.index'
            );
        }

        return view('services.edit', [
            'service'    => $service,
            'countries'  => $countries,
            'categories' => $categories,
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.edit_service') . ' ( ' . $service->id . ' )',
        ]);
    }

    /**
     * Update the specified service in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        $request->validate([
            'name_en'  => 'required|string',
            'name_ar'  => 'required|string',
            'name_tr'  => 'required|string',
            'status'   => 'required|boolean',
            'category' => 'required|numeric',
            'price.*'  => 'required|numeric',
        ]);

        $service->name_en     = $request->name_en;
        $service->name_ar     = $request->name_ar;
        $service->name_tr     = $request->name_tr;
        $service->status      = $request->status;
        $service->category_id = $request->category;
        $service->price       = 0.00;

        $service->save();

        $service_id = $service->id;
        ServicePrice::where(
            'service_id', $service_id
        )->delete();

        foreach ((array)$request->price as $k => $v) {
            $price = new ServicePrice([
                'service_id' => $service_id,
                'country_id' => (int)$k,
                'price'      => round((double)$v, 2)
            ]);
            $price->save();
        }

        $request->session()->flash('success',
            trans('admin.service_updated'));
        return redirect()->route('services.index');
    }

    /**
     * Remove the specified service from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        if (service::find($id)->delete()) {
            return response()->json('success', 200);
        }
    }

    /**
     * Active / Deactivate the specified service.
     *
     * @param int $id
     * @return Response
     */
    public function active($id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json('error', 200);
        }

        $service->status = !$service->status;
        if ($service->save()) {
            return response()->json('success', 200);
        }
    }
}
