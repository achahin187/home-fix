<?php

use App\NotificationType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingsTableSeeder extends Seeder
{
    /*
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings = <<<EOF
        {
            "company": "HomeFix",
            "company_phone": "0122231123",
            "whatsapp_phone": "0122231123",
            "automatic_worker": "1",
            "late_after": "1",
            "start_at": "09:00:00",
            "close_at": "17:00:00",
            "terms_en": "Terms in English",
            "terms_ar": "الشروط بالعربية",
            "terms_tr": "الشروط بالتركية",
            "conditions_en": "Conditions in English",
            "conditions_ar": "الأحكام بالعربية",
            "conditions_tr": "الأحكام بالتركية",
            "terms_image": "terms_conditions.png"
        }
EOF;

        DB::table('settings')->insert([
            'settings' => $settings
        ]);
    }
}
