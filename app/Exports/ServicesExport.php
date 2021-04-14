<?php

namespace App\Exports;

use App\Category;
use App\Service;
use App\Country;
use App\ServicePrice;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class ServicesExport implements FromCollection,WithMapping,WithHeadings
{
       /**
    * @return \Illuminate\Support\Collection
    */
   public function collection()
   {
       return Service::all();

   }



   public function map($registration) : array {
       $servicPrice =ServicePrice::where('service_id',$registration->id)->get();
       

 

       return [
        $registration->id,
        $registration->name_en,
        $registration->name_tr,
        $registration->name_ar,
        $servicPrice->pluck('country')->pluck('name_en'),
        $servicPrice->pluck('price') ,
        $registration->category_id,
        $registration->category['name_en'],
        $registration->category['name_tr'],
        $registration->category['name_ar'],



       
           
              ];


}

   public function headings() : array {
       
       return [
           'id',
           'name_english',
           'name_turkish',
           'name_arabic',
           'countries',
           'prices',
           'category/subCategory_id',
           'category/subCategory_name_english',
           'category/subCategory_name_turkish',
             'category/subCategory_name_arabic',


 
       


       


   
           
       ] ;
   }
  
}
