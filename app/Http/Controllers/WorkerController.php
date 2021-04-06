<?php

namespace App\Http\Controllers;

use App\Category;
use App\Country;
use App\Rules\DisposableEmail;
use App\Rules\Password;
use App\Rules\PhoneNumber;
use App\User;
use App\UserAddress;
use Avatar;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Imports\UsersImport;
use Storage;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UsersExport;


class WorkerController extends Controller
{
    protected $mainTitle;
    protected $notFound;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin']);

        $this->mainTitle = trans('admin.worker_management');
    }


///import workers 
public function import(Request $request) 
{
    try {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);
    
        $path = $request->file('file')->store('temp');
        $path=storage_path('app').'/'.$path;  
            Excel::import(new UsersImport,$path); 
    
        $request->session()->flash('success',trans('admin.workers_Import'));
        return redirect()->route('workers.index');
    

    } catch (\Exception $e) {

        $request->session()->flash('error','Password Is Required when upload first One');
        return redirect()->route('workers.index');   
    
    }



}

public function export() 
{
    return Excel::download(new UsersExport, 'workers.xlsx');
}

public function export_model() 

{
    $file_name='workers_model.xlsx';
    $path = storage_path().'/'.'app'.'/temp/'.$file_name;
    
    if (file_exists($path)) {
       
        return response()->download($path);
    }else{
        return redirect()->back();
    }
/*     return Storage::download(storage_path().'/'.'app'.,'workers_model.xlsx');
 */}




    /**
     * Display a listing of the worker.
     *
     * @return Response
     */
    public function index()
    {
        $workers = User::with('workerOrders', 'category')
            ->where('role', 'worker')->get();

        $categories = [];
        foreach ($workers as $worker) {
            try {
                $categories[(int)$worker->id] = trim($worker->category->name, ' - ');
            } catch (\Exception $e) {
                $cat_names   = '';
                $_categories = $worker->toArray()['category'];
                foreach (array_slice($_categories, 0, 3) as $cat) {
                    $cat_names .= "<a href='" . route('categories.show', $cat['id']) . '\'>' . $cat['name'] . '</a> - ';
                }
                $categories[(int)$worker->id] = trim($cat_names, ' - ') . ' ...';
            }
        }

        return view('workers.list', [
            'mainTitle'  => $this->mainTitle,
            'title'      => $this->mainTitle,
            'workers'    => $workers,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new worker.
     *
     * @return Response
     */
    public function create()
    {
        $countries = Country::where([
            ['status', true]
        ])->get();

        $categories = Category::where('parent_id', null)->get();

        return view('workers.add', [
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.add_worker'),
            'categories' => $categories,
            'countries'  => $countries,
        ]);
    }

    /**
     * Store a newly created worker in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string',
            'email'    => ['required', 'email', 'unique:users', new DisposableEmail()],
            'phone'    => ['required', 'unique:users', new PhoneNumber()],
            'address'  => 'required|string',
            'password' => ['required', 'confirmed', new Password(8)],
            'image'    => 'mimes:jpeg,jpg,png',
            'category' => 'required',
            'cv'       => 'mimes:pdf,doc,docx',
            'identity' => 'image',
            'badge'    => 'numeric',
            'country'  => 'required',
            'city'     => 'required',
        ]);

        $user = new User([
            'name'              => $request->name,
            'email'             => $request->email,
            'phone'             => $request->phone,
            'address'           => $request->address,
            'password'          => bcrypt($request->password),
            'activation_key'    => random_int(10000, 99999),
            'phone_verified_at' => Carbon::now(),
            'role'              => 'worker',
            'verified'          => true,
            'badge'             => $request->badge ?? 0,
        ]);

        $user->save();

        $categories = [];
        foreach (array_values($request->category) as $str) {
            $categories[] = (int)$str;
        }

        $category = Category::whereIn('id', $categories)->get();
        $user->category()->attach($category);


        if ($request->file('cv')) {
            $cv          = $request->file('cv');
            $cv_fileName = uniqid() . '.' . $cv->getClientOriginalExtension();
            Storage::disk('uploads')
                ->putFileAs('CVs/' . $user->id,
                    $cv, $cv_fileName);

            @unlink(base_path($user->cv_path));

            $user->cv = $cv_fileName;
            $user->save();
        }

        if ($request->file('identity')) {
            $identity          = $request->file('identity');
            $identity_fileName = uniqid() . '.' . $identity->getClientOriginalExtension();
            Storage::disk('uploads')
                ->putFileAs('identities/' . $user->id,
                    $identity, $identity_fileName);

            @unlink(base_path($user->id_path));

            $user->identity = $identity_fileName;
            $user->save();
        }

        if ($request->file('image')) {
            $avatar = $request->file('image');
            Storage::disk('uploads')->putFileAs('avatars/' . $user->id,
                $avatar, 'avatar.png');
                $user->update([
                    'status_image' => 1
                ]);
        } else {
            $this->createPlaceHolderAvatar($user->id, $user->name);
        }

        $user_address = new UserAddress([
            'user_id'    => $user->id,
            'country_id' => $request->country,
            'city_id'    => $request->city,
            'area'       => $request->address,
        ]);
        $user_address->save();

        $request->session()->flash('success',
            trans('admin.worker_added'));
        return redirect()->route('workers.index');
    }

    /**
     * Display the specified worker.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $worker = User::where([
            ['id', $id],
            ['role', 'worker'],
        ])->with('workerOrders', 'category')
            ->first();

        if ($worker === null) {
            return $this->_404(
                trans('admin.worker_notfound'),
                $this->mainTitle, 'workers.index'
            );
        }

        $cat_names = '';
        foreach ($worker->category as $cat) {
            $cat_names .= "<a href='" . route('categories.show', $cat->id) . '\'>' . $cat->name . '</a> - ';
        }

        $totalOrderPrice = array_sum(array_column(json_decode($worker->workerOrders), 'total_price'));
        return view('workers.view', [
            'worker'          => $worker,
            'totalOrderPrice' => $totalOrderPrice,
            'categories'      => trim($cat_names, '- '),
            'mainTitle'       => $this->mainTitle,
            'title'           => trans('admin.view_worker') . ' ( ' . $worker->name . ' )',
        ]);
    }

    /**
     * Show the form for editing the specified worker.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        $countries = Country::where([
            ['status', true]
        ])->get();

        $categories = Category::where('parent_id', null)->get();
        $user       = User::where('id', $id)
            ->with('category')->first();

        if ($user === null) {
            return $this->_404(
                trans('admin.worker_notfound'),
                $this->mainTitle, 'workers.index'
            );
        }

        return view('workers.edit', [
            'worker'     => $user,
            'countries'  => $countries,
            'mainTitle'  => $this->mainTitle,
            'title'      => trans('admin.edit_worker') .
                ' ( ' . $id . ' )',
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified worker in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $email = ['email', new DisposableEmail()];
        $phone = [new PhoneNumber()];

        if ($user->email !== $request->email) {
            $email[] = 'unique:users';
        }
        if ($user->phone !== $request->phone) {
            $phone[] = 'unique:users';
        }

        $request->validate([
            'name'     => 'string',
            'email'    => $email,
            'phone'    => $phone,
            'address'  => 'string',
            'password' => 'confirmed',
            'image'    => 'mimes:jpeg,jpg,png',
            'category' => 'required',
            'cv'       => 'mimes:pdf,doc,docx',
            'badge'    => 'numeric',
            'identity' => 'mimes:jpeg,jpg,png',
        ]);

        $user->name     = ($request->name) ?: $user->name;
        $user->email    = ($request->email) ?: $user->email;
        $user->phone    = ($request->phone) ?: $user->phone;
        $user->address  = ($request->address) ?: $user->address;
        $user->password = ($request->password)
            ? bcrypt($request->password)
            : $user->password;

        $user->verified = ($request->verified);
        $user->ban      = ($request->ban);
        $user->badge    = ($request->badge) ?: 0;

        $categories = [];
        foreach (array_values($request->category) as $str) {
            $categories[] = (int)$str;
        }

        $category = Category::whereIn('id', $categories)->get();
        $user->category()->detach();
        $user->category()->attach($category);

        if ($request->file('cv')) {
            $cv          = $request->file('cv');
            $cv_fileName = uniqid() . '.' . $cv->getClientOriginalExtension();
            Storage::disk('uploads')
                ->putFileAs('CVs/' . $user->id,
                    $cv, $cv_fileName);

            @unlink(base_path($user->cv_path));

            $user->cv = $cv_fileName;



            $user->save();
        }

        if ($request->file('identity')) {
            $identity          = $request->file('identity');
            $identity_fileName = uniqid() . '.' . $identity->getClientOriginalExtension();
            Storage::disk('uploads')
                ->putFileAs('identities/' . $user->id,
                    $identity, $identity_fileName);

            @unlink(base_path($user->id_path));

            $user->identity = $identity_fileName;
            $user->save();
        }

        if ($request->file('image')) {
            $avatar = $request->file('image');
            Storage::disk('uploads')->putFileAs('avatars/' . $user->id,
                $avatar, 'avatar.png');
                $user->update([
                    'status_image' => 1
                ]);
        }

        $user->save();

        if (isset($request->city)
            && isset($request->country)) {
            UserAddress::where(
                'user_id', $user->id
            )->update([
                'user_id'    => $user->id,
                'country_id' => $request->country,
                'city_id'    => $request->city,
                'area'       => $request->address,
            ]);
        }

/*    #TODO: SMS Verification Code
   $this->sendSMSFromAdmin($user->phone , $user->activation_key);
   /*      #send mail       
        Mail::to($user->email)
            ->send(new ActivationCode($user)); */ 

            
        $request->session()->flash('success',
            trans('admin.worker_updated'));
        return redirect()->route('workers.index');
    }

    /**
     * Remove the specified worker from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        if (User::find($id)->delete()) {
            return response()->json('success', 200);
        }
    }




    
    protected function sendSMSFromAdmin($phone, $activation_key , $type='key')
    {


        $phone = "" . $phone;
        $type == 'key';

      $message = "+كود+التفعيل+الخاص+بك+هو" . $activation_key ."+". "👍";


        // "https://dashboard.mobile-sms.com/api/sms/send?api_key=N1kxRFJiaUhQQWtnekxwUGt6RGxwWFh0dVlXTjNZUWVPeEtYREhLdE5SbDVhRkhJUVJGRVdnSVBTWTVx5eb3d8805bcc8&name=HomeFix&message=".$message."&numbers=".$number."&sender=HomeFix%20App&language=ar"
       // $c = curl_init("https://dashboard.mobile-sms.com/api/sms/send?api_key=N1kxRFJiaUhQQWtnekxwUGt6RGxwWFh0dVlXTjNZUWVPeEtYREhLdE5SbDVhRkhJUVJGRVdnSVBTWTVx5eb3d8805bcc8&name=HomeFix&message=".$message."&numbers=".$phone."&sender=HomeFix%20App&language=ar");
        $ch = curl_init("https://dashboard.mobile-sms.com/api/sms/send?api_key=dkVlUUJHRlBCZGlZdWhOZ1NieEduYVo3eGd6R0ozTW0xbEl2aEJRNmZkZENJWTZxNnFGelZJQ3MzWGcy5f62148cec25a&name=HomeFix&message=Your%20Activation%20Key%20Is%20".$message."&numbers=".$phone."&sender=HomeFix%20App&language=en");



        curl_setopt_array($ch, array(
            CURLOPT_POST => false,
            CURLOPT_RETURNTRANSFER => TRUE
        ));

 
        
        $response = curl_exec($ch);
        return $response;

        if ($response === FALSE) {
            return 0;
        } 


    }
  

}
