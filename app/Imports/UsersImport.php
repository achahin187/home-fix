<?php

namespace App\Imports;

use App\User;
use App\Category;
use App\UserAddress;
use App\worker_category;
use App\Country;
use App\city;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;
use Carbon\Carbon;

HeadingRowFormatter::default('none');

class UsersImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */

    public function model(array $row)
    {

        if (!isset($row['name'])) {
            return null;
        }
             
       //check if worker exists 
        $user=User::where('id',$row['id'] )
        ->where('role','worker')
        ->first();

        if(!$user){
            User::Create([
                'name'              => $row['name'],
                'email'             => $row['email'],
                'phone'             => $row['phone'],
                'password'          => Hash::make($row['password']),
                'activation_key'    => random_int(10000, 99999),
                'phone_verified_at' => Carbon::now(),
                'role'              => 'worker',
                'verified'          => true,

            ]);
            ///add category
            $category = Category::where('name_en', $row['category'])
            ->orWhere('name_tr', $row['category'])
            ->orWhere('name_ar', $row['category'])
            ->first();
            worker_category::create([
                'category_id'=>$category->id,
                'user_id' => $row['id'],
                
            ]); 


            ///add user_address
            $country = Country::where('name', $row['country'])->first();
            $city= City::where('name', $row['city'])
            ->where('country_id',$country->id)
            ->first();

             UserAddress::create([
                'user_id'    => $row['id'],
                'country_id' => $country->id,
                 'city_id'    => $city->id,
                'area'       => $row['area'], 
            ]);

           
            
            
            
            
        }else{
            $user->name     = ($row['name']) ?: $user->name;
            $user->email    = ($row['email']) ?: $user->email;
            $user->phone     = ($row['phone']) ?: $user->phone;
            $user->password     = (Hash::make($row['password']) ) ?: $user->password;
            $user->activation_key    = random_int(10000, 99999)?: $user->activation_key;
            $user->phone_verified_at  = Carbon::now()?: $user->phone_verified_at ;
            $user->role              = 'worker' ?: $user->role ;
            $user->verified         = true ?:   $user->verified  ;
            $user->save();

            ///update category 
           
            $category = Category::where('name_en', $row['category'])
            ->orWhere('name_ar', $row['category'])
            ->orWhere('name_tr', $row['category'])
            ->first();
             worker_category::where('user_id',$row['id'])->update([
                'category_id'=>$category->id,

            ]); 
            ///update user_address
            
            ///add user_address
            $country = Country::where('name', $row['country'])->first();
            $city= City::where('name', $row['city'])->first();

             UserAddress::where('user_id',$row['id'])->update([
                'country_id' => $country->id,
                 'city_id'    => $city->id,
                'area'       => $row['area'], 
            ]);

        }
         

  

       

    
      
       
           
        
    } 
    public function headingRow(): int
    {
        return 2;
    }


   
}
