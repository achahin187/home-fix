<?php

namespace App\Http\Controllers\API;

use App\Category;
use App\Http\Controllers\Controller;
use App\Service;
use App\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\User;


class CategoryController extends Controller
{
    public function getAllCategories()
    {
        $settings = DB::table('settings')
            ->first()->settings;
        $settings = json_decode($settings);

        $whatsapp = explode(',', $settings->whatsapp_phone);
        if (count($whatsapp) < 0) {
            $whatsapp = [];
        } else {
            $whatsapp = array_map(function ($phone) {
                $result              = [];
                $result['phone']     = $phone;
                $result['whats_app'] = 1;
                $result['icon']      = asset('images/whatsapp_icon.png');
                return $result;
            }, $whatsapp);
        }

        $phones = explode(',', $settings->company_phone);
        if (count($phones) < 0) {
            $phones = [];
        } else {
            $phones = array_map(function ($phone) {
                $result              = [];
                $result['phone']     = $phone;
                $result['whats_app'] = 0;
                $result['icon']      = asset('images/call_icon.png');
                return $result;
            }, $phones);
        }
        $phones = array_merge($phones, $whatsapp);

        $category = Category::where([
            ['status', 1],
            ['parent_id', null]
        ]);

        $offers = Offer::where(['status'=>1,'country_id'=>auth()->user()->user_country_id]);


        if (!$category) {
            $category = new Category();
        } else {
            $category = $category->with(
                'quick',
/*                 'offers',
 */                'subCategories'
            )->get();
        }

        return __success([
            'services' => $category,
            'offers' =>$offers,
            'phones'   => $phones
        ], 200);
    }

    public function searchInServices(Request $request)
    {
        $q = $request->query('q');

        $services = Service::where([
            ['name_en', 'like', '%' . $q . '%'],
            ['quick', false], ['checkup', false],
        ])->orWhere([
            ['name_ar', 'like', '%' . $q . '%'],
            ['quick', false], ['checkup', false],
        ])->orWhere([
            ['name_tr', 'like', '%' . $q . '%'],
            ['quick', false], ['checkup', false],
        ])->get();

        if ($services) {
            return __success($services, 200);
        } else {
            return __success(new Service(), 200);
        }
    }


        public function getWorkerCategories(Request $request)
    {


        $categories = Category::get();
        $worker_category = $request->user()->category()->get();
        ///return $categories
        $all = $categories->merge($worker_category);

        return [
            "type" => "success",
            'data' => [

                'id' => Auth::user()->id,
                'name' => Auth::user()->name,


                ////////////////////////////////////////////////////////////

                'categories' => $all->map(function ($cat) {
                    return [

                        'id' => $cat->id,
                        'CategoryName' => $cat->name,
                        'image' => $cat->image,
                        'parent_id' => $cat->parent_id,
                        'status' => $cat->status,
                        'pivot' => $cat->pivot,

                    ];
                }),
                /////////////////////////////////////////////////////////

            ],
        ];
    }





    public function setWorkerCategory(Request $request)
    {

        $user = User::find(Auth::id());
        ////////////////////////


        // foreach (array($request->category) as $str) {
        //     $categories[] = (int)$str;
        // }

        $categories = explode(',', $request->category);
        //$category = Category::whereIn('id', $categories)->get();

        $user->category()->sync($categories);

        $user->save();





        $categories = Category::get();
        $worker_category = $request->user()->category()->get();
        ///return $categories
        $all = $categories->merge($worker_category);

        return [
            'data' => [
                'success' => 200,


                'categories' => $all->map(function ($cat) {
                    return [

                        'id' => $cat->id,
                        'CategoryName' => $cat->name,
                        'image' => $cat->image,
                        'parent_id' => $cat->parent_id,
                        'status' => $cat->status,
                        'pivot' => $cat->pivot,

                    ];
                }),

            ],
        ];
    }
}
