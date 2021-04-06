<?php

namespace App\Exports;

use App\User;
use App\reviews;
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
                $registration->verified,
                $registration->review,
                $registration->workerOrders->count(),
                $registration->WorkerCategory['category'] ,
                $registration->user_address['country'],
                $registration->user_address['city'],
                $registration->user_address['area'],
               ];


 }
 
    public function headings() : array {
        
        return [
            'id',
          'name',
          'email',
          'phone',
          'verified',
          'review',
          'workerOrders',
          'category',
          'country',
          'city',
          'area',
			
        ] ;
    }
}