<?php

use App\NotificationType;
use Illuminate\Database\Seeder;

class NotificationsTableSeeder extends Seeder
{
    /*
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            'new_order'          => 'تم إختيارك لتنفيذ طلب جديد برقم {order_no}',
            'late_notifiy'       => 'تم نقل الطلب {order_no} لفني آخر بسبب التأخير',
            'order_status'       => 'تم تغيير حالة الطلب {order_no}',
            'new_message'        => 'تم إرسال رسالة جديدة',
            'order_note'         => 'تم إضافة خدمة جديدة من الفني في الطلب {order_no}',
            'accept_order_note'  => 'تمت الموافقة على الخدمة المضافة على الطلب {order_no}',
            'decline_order_note' => 'تم رفض الخدمة المضافة على الطلب {order_no}',
            'new_offer'          => 'تم إضافة عرض {offer_name} جديد',
            'accept_offer'       => 'تمت الموافقة على طلب إنضمامك في العرض {offer_name}',
            'new_category'       => 'تم إضافة قسم {category_name} جديد للتطبيق'
        ];
        foreach ($types as $k => $v) {
            $notification = new NotificationType([
                'type'    => $k,
                'message' => $v
            ]);
            $notification->save();
        }

        $status = [
            'order_pending'  => 'تم إستقبال الطلب {order_no} الخاص بك وجاري العمل عليه',
            'order_accept'   => 'تم قبول الطلب {order_no} بواسطة الفني المختص',
            'order_arrive'   => 'تم وصول الفني المرتبط بالطلب {order_no} إلى مكان التنفيذ',
            'order_paid'     => 'تم دفع المبلغ المستحق الخاص بالطلب {order_no}',
            'order_start'    => 'تم بدأ الفني بالعمل في الطلب {order_no}',
            'order_check'    => 'تم الإنتهاء من فحص العمل من قبل الفني المختص بالطلب {order_no}',
            'order_complete' => 'تم الإنتهاء من العمل في الطلب {order_no}',
            'order_cancel'   => 'تم إلغاء الطلب {order_no}',
        ];

        foreach ($status as $k => $v) {
            $notification = new NotificationType([
                'type'    => $k,
                'message' => $v
            ]);
            $notification->save();
        }
    }
}
