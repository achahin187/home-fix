<?php

namespace App\Exports;

use App\Category;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
class categoryExport implements FromCollection,WithMapping,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Category::where('parent_id', null)
        ->with('subCategories', 'quick')
        ->get();
    }


    public function map($registration) : array {
	    return [
	            $registration->id,
	            $registration->name_en,
                $registration->name_tr,
	            $registration->name_ar,
                $registration->status,
                $registration->subCategories->count(),
                $registration->subCategories->pluck('id'),
                $registration->subCategories->pluck('name_en')->toArray(),
              /*   $registration->subCategories->pluck('name_tr')->toArray(),
                $registration->subCategories->pluck('name_ar')->toArray(), */
             




	      
               ];


 }
 
    public function headings() : array {
        
        return [
            'id',
          'Category_english',
          'Category_Turkey',
          'Category_arabic',
          'satuts',
          'subCategories Count',
          'subCategories_id',
          'subCategories',
          /* 'subCategories Turkey',
          'subCategories arabic', */
         


    
			
        ] ;
    }

}
