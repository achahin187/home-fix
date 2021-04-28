<?php

namespace App\Exports;

use App\Category;
use App\Service;
use App\Country;
use App\ServicePrice;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class ServicesExport implements FromCollection, WithMapping, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Service::all();
    }



    public function map($registration): array
    {
        $servicPrice = ServicePrice::where('service_id', $registration->id)->get();
        $category = Category::where('id', $registration->category_id)->where('parent_id', '=', null)->first();

        $subcategory = Category::where('id', $registration->category_id)->where('parent_id', '!=', null)->first();




        return [
            $registration->id,
            $registration->name_en,
            $registration->name_tr,
            $registration->name_ar,
            $servicPrice->pluck('country')->pluck('name_en'),
            $servicPrice->pluck('price'),
            $category->id ?? '-',
            $subcategory['id'] ?? '-',
            $category['name_en'] ?? '-',
            $category['name_tr'] ?? '-',
            $category['name_ar'] ?? '-',
            $subcategory['name_en'] ?? '-',
            $subcategory['name_tr'] ?? '-',
            $subcategory['name_ar'] ?? '-',







        ];
    }

    public function headings(): array
    {

        return [
            'id',
            'name_english',
            'name_turkish',
            'name_arabic',
            'countries',
            'prices',
            'category_id',
            'subCategory_id',
            'category_name_english',
            'category_name_turkish',
            'category_name_arabic',
            'subcategory_name_english',
            'subcategory_name_turkish',
            'subcategory_name_arabic',












        ];
    }
}
