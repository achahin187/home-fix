<?php

namespace App\Exports;

use App\User;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
class UsersExport implements FromCollection,WithMapping,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return User::where('role', 'worker')->get();

        
              

    }
    public function map($registration) : array {


	    return [
	            $registration->id,
	            $registration->name,
	            $registration->email,
                $registration->phone,
                $registration->category->pluck('name'),
                $registration->country->pluck('name'),
                $registration->city->pluck('name'),
                $registration->user_address['area'],
               ];


 }
 
    public function headings() : array {
        
        return [
            'id',
          'name',
          'email',
          'phone',
          'category',
          'country',
          'city',
          'area',
			
        ] ;
    }
}