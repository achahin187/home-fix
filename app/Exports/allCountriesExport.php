<?php

namespace App\Exports;

use App\Country;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;

class allCountriesExport  implements FromCollection, WithMapping, WithHeadings
{

    /**
     * @return \Illuminate\Support\Collection
     */

    public function collection()
    {
        return Country::all();
    }


    public function map($registration): array
    {
        return [
            $registration->id,
            $registration->name_en,
            $registration->name_tr,
            $registration->name_ar,
            $registration->currency_en,
            $registration->currency_tr,
            $registration->currency_ar,








        ];
    }

    public function headings(): array
    {

        return [
            'id',
            'name_english',
            'name_turkish',
            'name_arabic',
            'currency_english',
            'currency_turkish',
            'currency_arabic',



        ];
    }
}
