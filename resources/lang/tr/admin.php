<?php

use Carbon\Carbon;

return [
    /*
    |--------------------------------------------------------------------------
    | Dashboard Language Lines
    |--------------------------------------------------------------------------
    */

    /**
     * Global
     */
    
    'new_worker'=>'new_worker',
    'country_management' => 'country management',

    'send activation_key'       =>     'send activation_key',

    'the_country'            =>'the_country' ,
    'control_panel'           => 'Control Panel',
    'greeting'                => 'Hello',
    'or_upload'               => 'Or Upload',
    'upload_or_search'        => 'Upload or Search by item',
    'notes'                   => 'Notes',
    'roles'                   => 'Privileges',
    'login'                   => 'Login',
    'the_area'                => 'Area',
    'reset_password'          => 'Reset Password',
    'remember_me'             => 'Remember me',
    'select_all'              => 'Select all',
    'deselect_all'            => 'Deselect all',
    'delete_all'              => 'Delete all',
    'delete_all_confirmation' => 'Are you sure you want to delete all selected items?',
    'select_category'         => 'Select category ',
    'select_workers'          => ' Select Technician',
    'send_password'           => ' Send URL',
    'content'                 => 'The Message',
    'super-admin'             => 'Super Administrator',
    'admin'                   => 'Administrator',
    'address'                 => 'Address',
    'day'                     => 'Day',
    'week'                    => 'Week',
    'subject'                 => 'Subject',
    'author'                  => 'By',
    'month'                   => 'Month',
    'year'                    => 'Year',
    'from'                    => 'From',
    'to'                      => 'To',
    'time'                    => 'Timing',
    'by'                      => 'By',
    'quantity'                => 'Quantity',
    'manager'                 => 'Manager',
    'issue'                   => 'Issue',
    'unknown'                 => 'Unknown',
    'info'                    => 'Information',
    'image'                   => 'Image',
    'name'                    => 'Name',
    'register'                => 'Register ',
    'save'                    => 'Save',
    'name_en'                 => 'Name in English',
    'name_ar'                 => 'Name in Arabic',
    'name_tr'                 => 'Name in Turkish',
    'description'             => 'Description',
    'description_en'          => 'Description in English',
    'description_ar'          => 'Description in Arabic',
    'description_tr'          => 'Description in Turkish',
    'price'                   => 'Price',
    'phone'                   => 'Phone',
    'email'                   => 'E-mail',
    'password'                => 'Password',
    'password_confirmation'   => 'Confirm Password',
    'reviews'                 => 'Reviews',
    'credit'                  => 'Credit',
    'status'                  => 'Status',
    'settings'                => 'Settings',
    'delete'                  => 'Delete',
    'unban_user'              => 'UnBan User',
    'ban_user'                => 'Ban User',
    'unverify_user'           => 'Unverify User',
    'verify_user'             => 'verify',
    'edit'                    => 'Modify',
    'view'                    => 'View',
    'cancel'                  => 'Cancel',
    'verified'                => 'Verified',
    'un_verified'             => 'Unverified',
    'active'                  => 'Active',
    'un_active'               => 'Inactive',
    'ban'                     => 'Banned',
    'un_ban'                  => 'Unbanned',
    'loading'                 => 'Loading ...',
    'icon_error'              => 'Sorry, There\'s an error, Please Try again later.',
    'icon'                    => 'Icon',
    'accepted'                => 'Accepted',
    'un_accepted'             => 'Unaccepted',
    's_verified'              => 'Verified',
    's_un_verified'           => 'Unverified',
    'pending'                 => 'Pending',
    'canceled'                => 'Canceled',
    'completed'               => 'Completed',
    'choose_status'           => 'All Orders',
    'logout'                  => 'Logout',
    'update_profile'          => 'Update Profile',
    'profile_update_success'  => 'Profile Updated Successfully',
    'call_company_phone'      => 'Phones (Call)',
    'whatsapp_company_phone'  => 'Phones (WhatsApp)',
    'automatic_worker'        => 'Auto-Choose technician',
    'cv'                      => 'Curriculum Vitae',
    'identity'                => 'Passport',
    'badge'                   => 'Certification',
    'add_prices'              => 'Add Prices',
    'must_fill_prices'        => 'Please, Fill all prices.',
    'prices_per_country'      => 'Price / Country',
    'quick_service'           => 'Quick Service',
    'checkup_service'         => 'CheckUp Service',
    'certified'               => 'Certified',
    'un_certified'            => 'Un Certified',
    'choose_country'          => 'Choose Country',

    'terms_en'                 => 'Terms in English',
    'terms_ar'                 => 'Terms in Arabic',
    'terms_tr'                 => 'Terms in Turkish',
    'conditions_ar'            => 'Conditions in Arabic',
    'conditions_en'            => 'Conditions in English',
    'conditions_tr'            => 'Conditions in Turkish',
    'terms_image'              => 'Terms&Conditions Image',


    // Add messages
    'add_success'              => 'Role added successfully',
    // Update messages
    'update_success'           => 'Role updated Successfully',
    // Delete messages
    'delete_confirm'           => 'Are you sure you want to delete Role?',
    'delete_success'           => 'Role deleted Successfully',
    'delete_error'             => 'Sorry, this Role can\'t be deleted',
    // Ban messages
    'ban_confirm'              => 'Are you sure you want to ban role ?',
    'ban_success'              => 'Role Banned Successfully',
    'ban_error'                => 'Sorry this role can\'t be Banned',
    // Un Ban messages
    'unban_confirm'            => 'Are you sure you want to unban role?',
    'unban_success'            => 'Role unbanned successfully',
    'unban_error'              => 'Sorry, this role can\'t be unbanned',
    // Verifiy messages
    'verify_confirm'           => 'Are you sure you want to verify this role?',
    'verify_success'           => 'Role verified Successfully',
    'verify_error'             => 'Sorry this Role can\'t be verified ',
    // Un Verifiy messages
    'unverify_confirm'         => 'Are you sure you want to cancel verifying this role?',
    'unverify_success'         => 'Role verifying canceled successfully',
    'unverify_error'           => 'Sorry, verifying this role can\'t be canceled',

    // Errors
    '401_error'                => 'Sorry, you\'re not authorized tp enter this page.',
    '404_error'                => 'sorry, The page doesn\'t exist.',

    /**
     * Users
     */
    'active_status'            => 'verify account',
    'ban_status'               => 'Ban account ',
    'user_status'              => 'Account status ',

    /**
     * Admins
     */
    'user'                     => 'Manager',
    'the_user'                 => 'The manager',
    'user_info'                => 'Manager Information',
    'user_management'          => 'Managers management',
    'user_list'                => 'view Managers',
    'add_user'                 => 'Add new manager',
    'view_user'                => 'view manager information',
    'edit_user'                => 'edit manager information',
    'user_notfound'            => 'Sorry, this manager doesn\'t exist',
    'user_add_success'         => 'Manager added successfully',
    'user_update_success'      => 'Manager information updated successfully',

    /**
     * Clients
     */
    'client'                   => 'Client',
    'the_client'               => 'The client',
    'client_info'              => 'client information',
    'client_management'        => 'Client management',
    'client_list'              => 'view clients',
    'add_client'               => 'Add new client',
    'view_client'              => 'view client information',
    'edit_client'              => 'edit client information',
    'client_notfound'          => 'Sorry, this client doesn\'t exist',
    'client_added'             => 'Client added successfully',
    'client_edit'              => 'edit client information',
    'client_updated'           => 'Client information updated successfully',


    /**
     * Workers
     */
    'worker'                   => 'technician',
    'the_worker'               => 'the technician',
    'the_workers'              => 'technicians',
    'worker_info'              => 'technicians information',
    'worker_management'        => 'technicians management',
    'worker_list'              => 'view technicians',
    'add_worker'               => 'add new technicians',
    'view_worker'              => 'view technician information',
    'edit_worker'              => 'edit technician information',
    'worker_added'             => 'technician added successfully',
    'worker_updated'           => 'technician information updated successfully',
    'worker_notfound'          => 'Sorry, this technician doesn\'t exist',

    /**
     * Categories
     */
    'category'                 => 'category',
    'the_category'             => 'The category',
    'category_info'            => 'category information',
    'category_management'      => 'category management',
    'category_list'            => 'view categories',
    'add_category'             => 'add new category',
    'view_category'            => 'view category information ',
    'edit_category'            => 'edit category information',
    'search_icon'              => 'Enter a valid word for search',
    'main_cat'                 => 'Main category',
    'parent_cat'               => 'parent category',
    'checkup_placeholder'      => 'Comprehensive examination service price',
    'checkup_price'            => 'Checkup service price',
    'quick_placeholder'        => 'quick order service price',
    'quick_price'              => 'quick order price',
    'child_categories'         => 'subcategories',
    'category_added'           => 'category added successfully',
    'category_updated'         => 'category updated successfully',
    'category_state'           => 'category status',
    'category_notfound'        => 'Sorry, this category doesn\'t exist',

    /**
     * Services
     */
    'service'                  => 'service',
    'the_service'              => 'the service',
    'services'                 => 'services',
    'service_info'             => 'service information',
    'service_management'       => 'service management',
    'service_list'             => 'view services',
    'add_service'              => 'add new service',
    'view_service'             => 'view service information',
    'edit_service'             => 'edit service information',
    'service_added'            => 'service added successfully',
    'service_updated'          => 'service updated successfully',
    'service_state'            => 'service status',
    'service_notfound'         => 'sorry, this service doesn\'t exist',
    'service_delete_confirm'   => 'Are you sure you want to delete this service?',
    'service_delete_success'   => 'service deleted successfully',
    'service_delete_error'     => 'sorry, this service can\'t be deleted',
    'service_verify_confirm'   => 'do you want to verify this service ?',
    'service_verify_success'   => 'service verified successfully',
    'service_verify_error'     => 'sorry, can\'t verify this service',
    'service_unverify_confirm' => 'are you sure you want to cancel verifying this service?',
    'service_unverify_success' => 'service verifying canceled successfully',
    'service_unverify_error'   => 'sorry, you can\'t cancel verifying this service',

    /**
     * Offers
     */
    'offer'                    => 'offer',
    'the_offer'                => 'the offer',
    'offers'                   => 'offers',
    'offer_info'               => 'offer information',
    'offer_management'         => 'offers management',
    'offer_list'               => ' view offers',
    'add_offer'                => 'add new offer',
    'view_offer'               => 'view offer information',
    'edit_offer'               => 'edit offer information',
    'offer_added'              => 'offer added successfully',
    'offer_updated'            => 'offer information updated successfully',
    'offer_state'              => 'offer status',
    'offer_notfound'           => 'sorry, this offer doesn\'t exist',
    'offers_orders_management' => 'offers orders management',
    'offer_worker_choose'      => 'choose technician',
    'offer_worker_updated'     => 'The technicians\' subscription has been successfully modified.',
    'end_at'                   => 'ends in',
    'pick-a-date'              => 'please pick a date',
    'pick-a-time'              => 'please pick a time',

    /**
     * Orders
     */
    'the_quick_orders'         => 'Quick Orders List',
    'total_price'              => 'price',
    'total_orders'             => 'total orders',
    'total_missions'           => 'total missions',
    'order_count'              => 'order count',
    'order'                    => '{0} no orders |[1,2] order |[3,10] orders |[11,*] order ',
    'client_order'             => 'client order',
    'worker_order'             => 'technician order',
    'orders'                   => 'order',
    'order_no'                 => 'order number',
    'the_order'                => 'the order',
    'order_info'               => 'order information',
    'order_management'         => 'order management',
    'order_list'               => 'view orders',
    'offers_orders'            => 'view offers orders',
    'add_order'                => 'add new order',
    'view_order'               => 'view order information',
    'edit_order'               => 'edit order information',
    'worker_notes'             => 'technician orders',
    'order_status'             => 'order status',
    'payment_method'           => 'payment method',
    'cash_on_delivery'         => 'pay on delivery',
    'online_payment'           => 'pay online',
    'worker_choose'            => 'chose technician for order',
    'order_update_success'     => 'order updated successfully',
    'edit_order_worker'        => 'technician choice',
    'order_notfound'           => 'sorry, this order doesn\'t exist.',
    'client_address'           => 'client address',
    'total_order_number'       => 'total order number',
    'total_paid_orders'        => 'total paid orders',
    'completed_orders'         => 'completed orders',
    'canceled_orders'          => 'total cancelled orders',
    'orders_need_worker'       => 'orders without technician',
    'order_need_worker'        => 'order without technician',
    'filter_order'             => 'order by status',
    'workers_notfound'         => 'no technicians found',
    'clients_notfound'         => 'no clients found',
    'no_orders'                => 'no orders',
    'client_orders'            => 'client orders',
    'worker_orders'            => 'technician orders',
    'order_edit'               => 'order information edit',
    'order_tracking'           => 'order tracking',
    'buy_date'                 => 'buy date',

    /**
     * Reviews
     */
    'review_management'        => 'review management',
    'client_review_management' => 'client review management',
    'worker_review_management' => 'worker review management',
    'add_review'               => 'reviews management',
    'review'                   => 'review',
    'the_review'               => 'the review',
    'clients_reviews'          => 'clients reviews',
    'workers_reviews'          => 'technicians reviews',
    'client_review'            => 'client review ',
    'worker_review'            => 'technicians reviews',
    'review_content'           => 'review content',

    /**
     * Reviews
     */
    'reports_management'       => 'reports management',


    /**
     * Dashboard Statistics
     */
    'orders_count'             => '{0} order |[1,2] order |[3,*] orders',
    'clients_count'            => '{0} client |[1,2] client |[3,10] clients |[11,*] client',
    'workers_count'            => '{0} technician |[1,2] technician |[3,10] technicians |[11,*] technician',
    'customer_satisfaction'    => 'customer satisfaction ',
    'new_orders'               => 'Today\'s orders',
    'date'                     => 'date',
    'revenue'                  => 'revenue',
    'ordered_times'            => 'number of orders',
    'most_popular_service'     => 'most popular service',
    'active_clients'           => 'most active clients',
    'active_workers'           => 'most active technicians',

    /**
     * Dashboard Notifications
     */

    'notifications'       => 'notifications',
    'all_notifications'   => 'clear all notifications',
    'new_order'           => 'new order added successfully',
    'no_notifications'    => 'no new notifications',
    'new_worker_in_offer' => 'a technician subscribes in offer ',

    /**
     * System Settings
     */
    'company'             => 'company name',
    'worker_start_at'     => 'start work',
    'worker_close_at'     => 'finish work',
    'worker_late_after'   => 'Fine delay after',
    'hour'                => 'hour',
    'settings_updated'    => 'settings updated successfully',

    'notifications_settings'     => 'notifications',
    'all_notifications_settings' => 'all notifications',
    'order_status_notifications' => 'change order status notifications',

    'n_new_order'          => 'new order',
    'n_late_notifiy'       => 'technician is late',
    'n_order_status'       => 'change order status',
    'n_new_message'        => 'send/receive message',
    'n_order_note'         => 'add technician to service',
    'n_accept_order_note'  => 'accept technician orders',
    'n_decline_order_note' => 'refuse technician orders',
    'n_new_offer'          => 'add new offer',
    'n_accept_offer'       => 'accept technician with offer',
    'n_new_category'       => 'add new category',

    'order_pending'           => 'new order',
    'order_accept'            => 'order accept',
    'order_arrive'            => 'technician arrive',
    'order_paid'              => 'pay for order',
    'order_start'             => 'start order',
    'order_check'             => 'technician check',
    'order_complete'          => 'order completed',
    'order_cancel'            => 'Cancel Order',

    /**
     * Chat
     */
    'chat_managment'          => 'chat management',
    'message_unver'           => 'Block message',
    'message_ver'             => 'show message',
    'message_del'             => 'delete message',
    'message_delete_confirm'  => 'Are you sure you want to delete this message ?',
    'message_status_confirm'  => 'do you want to change the status of this message?',
    'type_message'            => 'right your message',
    'send'                    => 'send',
    /*Slider  */
    'slider'                  => 'Mange Slider',
    'add_Slider'              => 'add_Slider',
    'view_Slider'             => 'view_Slider',
    'edit_Slider'             => 'edit_Slider',
    'Slider_updated'         => 'Slider_updated',
    'Slider_notfound'        => 'لا يوجد سليدر',
    'Slider_head'          => 'Slider Head' , 

    'Slider_text'          => 'Slider Text',
    'title_ar'            => 'Slider Title In Arabic' , 
    'title_en'            => 'Slider Title In English ' ,
    'title_tr'            => 'Slider Title In Turkish ' ,

    'text_ar'            => 'Slider Text In Arabic' , 
    'text_en'            => 'Slider Text In English ' ,
    'text_tr'            => 'Slider Text In Turkish ' ,
    'Slider_added'       =>   'You Add Slider Show Successfully ' ,
    
        'Partners'   =>   'Add Partners',
    'add_Partners' => 'Add Partners',
    'Partners_added' => 'You Add Partner Successfully',
    'Partner_notfound' => 'Partner Not Found',
    'view_Partner' => 'View Partner',
    'edit_Partner' => 'Edit Partner',
    'Partner_updated' => 'update Partner',


    /**
     * Complains
     */
    'the_complain'            => 'The Complain',
    'complain_management'     => 'Complains Management',
    'complain_make_as_read'   => 'Mark as Read',
    'complain_make_unread'    => 'Mark as unRead',
    'complain_delete_confirm' => 'Would you like to delete this complain?',
    'complain_status_confirm' => 'Would you like to change this complain\'s status?',
    'complain_status_changed' => 'Complain\'s status has been changed.',
    'complain_status_error'   => 'Can not change complain\'s status.',
    'complain_not_found'      => 'Sorry, This complain was not found.',
    'view_complain'           => 'View the complain',

    /**
     * Footer
     */
    'copy'                    => '© ' . Carbon::now()->format('Y') . ' all rights reserved.',
    'powered'                 => "developed byـ <i class=\"ft-heart pink\"></i> بواسطة <a href=\"http://www.eramint.com\">Eramint</a>",

];
