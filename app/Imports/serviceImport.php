<?php

namespace App\Imports;

use App\Service;
use App\Country;
use App\ServicePrice;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;
use Carbon\Carbon;
use Exception;

HeadingRowFormatter::default('none');

class serviceImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */

    public function model(array $row)
    {

        if (!isset($row['name_english'])) {
            return null;
        }


        //check if service exists 
        $service = Service::where('id', $row['id'])->first();



        if (!$service) {

            $service = Service::Create([
                'name_en'              => $row['name_english'],
                'name_tr'              => $row['name_turkish'],
                'name_ar'              => $row['name_arabic'],
                'price'                => 0,
                'category_id'          => $row['subcatgory_id'],
                'checkup'             => 0,
                'quick'               => 0,
                'status'             => 1,
            ]);


            $countries = explode(',', $row['countries']);
            $prices = explode(',', $row['prices']);



            foreach ($countries as $index => $country) {

                $price = new ServicePrice([
                    'service_id' => $service->id,
                    'country_id' => $country,
                    'price'      => round((float)$prices[$index], 2),
                ]);
                $price->save();
            }
        } else {

            $service->name_en    = ($row['name_english']) ?: $service->name_en;
            $service->name_tr    = ($row['name_turkish']) ?: $service->name_tr;
            $service->name_ar   = ($row['name_arabic']) ?: $service->name_ar;
            $service->price =      0 ?: $service->price;
            $service->category_id = 0 ?: $service->category_id;
            $service->checkup = 0 ?: $service->checkup;
            $service->quick = 0 ?: $service->quick;
            $service->status = 1 ?: $service->status;
            $service->save();

            ServicePrice::where(
                'service_id',
                $service->id
            )->delete();

            $countries = explode(',', $row['countries']);
            $prices = explode(',', $row['prices']);


            foreach ($countries as $index => $country) {

                $price = new ServicePrice([
                    'service_id' => $service->id,
                    'country_id' => $country,
                    'price'      => round((float)$prices[$index], 2),
                ]);
                $price->save();
            }
        }
    }



    public function headingRow(): int
    {
        return 1;
    }
}
