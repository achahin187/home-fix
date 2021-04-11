<?php

namespace App\Exports;
use App\Category;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class subcategoryExport implements FromCollection,WithMapping,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Category::where('parent_id','!=',null)->get();

    }



    public function map($registration) : array {
	    return [
            $registration->parent_id,
            $registration->parent['name_en'],
            $registration->parent['name_tr'],
            $registration->parent['name_ar'],
	            $registration->id,
	            $registration->name_en,
                $registration->name_tr,
	            $registration->name_ar,
              
            
               ];


 }
 
    public function headings() : array {
        
        return [
            'category_id',
            'category_english',
            'category_Turkey',
            'category_arabic',
            'Subcategory_id',
          'SubCategory_english',
          'SubCategory_Turkey',
          'SubCategory_arabic',
        


        


    
			
        ] ;
    }
}
