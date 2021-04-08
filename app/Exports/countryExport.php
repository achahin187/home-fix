<?php

namespace App\Exports;

use App\Country;
use App\City; 
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class countryExport implements FromCollection,WithMapping,WithHeadings
{

    protected $id;

 function __construct($id) {
        $this->id = $id;
 }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
          return   City::where('country_id',$this->id)->get();
    }



             
    
    public function map($registration) : array {
      $country = Country::where('id',$registration->country_id)->first();
	    return [
	            $registration->id,
                $registration->name_en,
	            $registration->name_tr,
	            $registration->name_ar,
                $registration->country_id,
                $country->name_en,
                $country->name_tr,
                $country->name_ar,


           
            
               ];


             }
 
    public function headings() : array {
        
        return [
            'city_id',
            'city_name_english',
            'city_name_turkish',
            'city_name_arabic',
            'country_id',
            'country_name_english',
            'country_name_turkish',
            'country_name_arabic',


        

    


        


    
			
        ] ;
    }
}
