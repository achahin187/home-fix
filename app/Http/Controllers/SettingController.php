<?php

namespace App\Http\Controllers;

use Avatar;
use File;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Storage;

class SettingController extends Controller
{
    protected $mainTitle;
    protected $flatIconsAPI;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin']);

        $this->mainTitle = trans('admin.settings');
    }

    /**
     * Show the form for editing the specified category.
     *
     * @param int $id
     * @return Response
     */
    public function edit()
    {
        $_notifications = DB::table('notification_types')->get();
        $notifications  = [];
        foreach ($_notifications as $notification) {
            $notifications[$notification->type]['tu'] = $notification->message;
            $notifications[$notification->type]['en'] = $notification->message_en;
            $notifications[$notification->type]['ar'] = $notification->message_ar;
        }

        $settings = DB::table('settings')
            ->first()->settings;
        $settings = json_decode($settings);

        $settings->terms_en      = str_replace('|', "\n", $settings->terms_en ?? '');
        $settings->terms_ar      = str_replace('|', "\n", $settings->terms_ar ?? '');
        $settings->terms_tr      = str_replace('|', "\n", $settings->terms_tr ?? '');
        $settings->conditions_en = str_replace('|', "\n", $settings->conditions_en ?? '');
        $settings->conditions_ar = str_replace('|', "\n", $settings->conditions_ar ?? '');
        $settings->conditions_tr = str_replace('|', "\n", $settings->conditions_tr ?? '');

        return view('settings', [
            'company'             => $settings->company ?? '',
            'company_phone'       => $settings->company_phone ?? '',
            'whatsapp_phone'      => $settings->whatsapp_phone ?? '',
            'automatic_worker'    => $settings->automatic_worker ?? '',
            'notifications_types' => $notifications ?? [],
            'start_at'            => $settings->start_at ?? '',
            'close_at'            => $settings->close_at ?? '',
            'late_after'          => $settings->late_after ?? '',
            'terms_en'            => $settings->terms_en ?? '',
            'terms_ar'            => $settings->terms_ar ?? '',
            'terms_tr'            => $settings->terms_tr ?? '',
            'conditions_en'       => $settings->conditions_en ?? '',
            'conditions_ar'       => $settings->conditions_ar ?? '',
            'conditions_tr'       => $settings->conditions_tr ?? '',
            'email'               => $settings->email ?? '',
            'facebook'            => $settings->facebook ?? '',
            'twitter'             => $settings->twitter ?? '',
            'instagram'           => $settings->instagram ?? '',
            'mainTitle'           => $this->mainTitle,
            'title'               => trans('admin.settings'),
        ]);
    }

    /**
     * Update the specified category in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'close_at'       => 'required',
            'late_after'     => 'required|numeric',
            'start_at'       => 'required',
            'company'        => 'required|string',
            'company_phone'  => 'required|string',
            'whatsapp_phone' => 'required|string',
            'facebook'       => 'nullable|string',
            'twitter'        => 'nullable|string',
            'instagram'      => 'nullable|string',
            'email'          => 'nullable|string',
        ]);

        $settings = DB::table('settings')
            ->first()->settings;
        $settings = json_decode($settings);

        $request->company          = (string)$request->company;
        $request->company_phone    = (string)$request->company_phone;
        $request->whatsapp_phone   = (string)$request->whatsapp_phone;
        $request->automatic_worker = ($request->automatic_worker == '1') ? '1' : '0';
        $request->automatic_worker = (string)$request->automatic_worker;
        $request->late_after       = (int)$request->late_after;
        $request->start_at         = date('H:i:s', strtotime($request->start_at));
        $request->close_at         = date('H:i:s', strtotime($request->close_at));

        if ($request->file('term_image')) {
            $image          = $request->file('term_image');
            $image_fileName = 'terms_conditions.' .
                $image->getClientOriginalExtension();
            Storage::disk('uploads')
                ->putFileAs('images/', $image, $image_fileName);
        } else {
            $image_fileName = $settings->terms_image;
        }

        $request->terms_en      = preg_replace("/\r\n/", '|', $request->terms_en);
        $request->terms_ar      = preg_replace("/\r\n/", '|', $request->terms_ar);
        $request->terms_tr      = preg_replace("/\r\n/", '|', $request->terms_tr);
        $request->conditions_en = preg_replace("/\r\n/", '|', $request->conditions_en);
        $request->conditions_ar = preg_replace("/\r\n/", '|', $request->conditions_ar);
        $request->conditions_tr = preg_replace("/\r\n/", '|', $request->conditions_tr);
        $settings               = <<<EOF
        {
            "company": "$request->company",
            "company_phone": "$request->company_phone",
            "whatsapp_phone": "$request->whatsapp_phone",
            "automatic_worker": "$request->automatic_worker",
            "late_after": "$request->late_after",
            "start_at": "$request->start_at",
            "close_at": "$request->close_at",
            "terms_en": "$request->terms_en",
            "terms_ar": "$request->terms_ar",
            "terms_tr": "$request->terms_tr",
            "conditions_en": "$request->conditions_en",
            "conditions_ar": "$request->conditions_ar",
            "conditions_tr": "$request->conditions_tr",
            "email": "$request->email",
            "facebook": "$request->facebook",
            "twitter": "$request->twitter",
            "instagram": "$request->instagram",
            "terms_image": "$image_fileName"
        }
EOF;
        DB::table('settings')
            ->update(['settings' => $settings]);


        $_notifications = DB::table('notification_types')->get()->pluck('type')->toArray();
        $counta = 0;
        foreach ($request->all() as $k => $v) {
            if (in_array(str_replace('n_', '', $k) , $_notifications) ){
                DB::table('notification_types')
                ->where('type', str_replace('n_', '', $k))
                ->update(['message' => $v[0] , 'message_en' => $v[1] , 'message_ar' => $v[2]]);
            $counta ++;
            }
        }

        // dd($counta);

        $request->session()->flash(
            'success',
            trans('admin.settings_updated')
        );
        return $this->edit();
    }
}
