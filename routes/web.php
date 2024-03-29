<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\DB;
Route::get('cache', function () {
//    return php artisan cache:clear ;
     Artisan::call('cache:clear');
          return back();
 });

Auth::routes(['register' => false]);

Route::get('logout', 'Auth\LoginController@logout')
    ->name('logout');

Route::get('/', 'HomeController@index')->name('home');
Route::get('getRevenueBy', 'DashboardController@getRevenueBy')->name('getRevenueBy');
Route::get('admin', 'DashboardController@admin')->name('admin');

Route::get('profile', 'ProfileController@profile')
    ->name('profile');
Route::put('profile/{id}', 'ProfileController@updateProfile')
    ->name('profile.update');

// Admins
Route::resource('users', 'UserController');
// Clients
Route::resource('clients', 'ClientController');
Route::get('u/{id}/orders', 'OrderController@orders')
    ->name('users.orders');

// Workers
Route::resource('workers', 'WorkerController');
Route::post('workers/import_workers','WorkerController@import')->name('import');
Route::get('export/', 'WorkerController@export')->name('export');
Route::get('export_model/', 'WorkerController@export_model')->name('export_model');




// Countries
Route::resource('countries', 'CountryController');
Route::put('countries/active/{id}', 'CountryController@active')
    ->name('active.country');
Route::get('countries/cities/{id}', 'CountryController@getCitiesByCountry')
    ->name('country.cities');
    ///export_country
Route::get('samples/country/{id}','sampleController@export_country')->name('export_country');
/// export all countries 
Route::get('export_all_countries/', 'CountryController@export_all_countries')->name('export_all_countries');


// Cities
Route::post('cities/{id}', 'CountryController@addNewCity')
    ->name('create.city');
Route::put('cities/active/{id}', 'CountryController@activeCity')
    ->name('active.city');
Route::put('cities/{id}', 'CountryController@updateCity')
    ->name('cities.update');
Route::delete('cities/{id}', 'CountryController@destroyCity');
Route::delete('cities/destroy/{id}', 'CountryController@destroyCity')
    ->name('cities.destroy');

// Orders
Route::resource('orders', 'OrderController');
Route::get('quick', 'OrderController@quickIndex')
    ->name('orders.quick');
Route::delete('notes/{id}', 'OrderController@deleteNote')
    ->name('note.destroy');
Route::delete('oservice/{order}/{service}', 'OrderController@deleteOrderService')
    ->name('order_service.destroy');

// Ban / Unban a User
Route::put('user/ban/{id}', 'UserController@ban')
    ->name('ban.user');
// Verify / Unverify a User
Route::put('user/verify/{id}', 'UserController@verify')
    ->name('verify.user');
    ///send message to mobile 
 Route::get('user/sendMessage/{id}', 'UserController@sendMessage')
    ->name('sendMessage');



// Categories
Route::resource('categories', 'CategoryController');
Route::put('categories/active/{id}', 'CategoryController@active')
    ->name('active.category');
///export category
Route::get('samples/category','sampleController@category')->name('category');
///export for subcategory
Route::get('samples/subcategory','sampleController@subcategory')->name('subcategory');
// Sub Categories
Route::resource('categories/sub', 'SubCategoryController');

// Services
Route::resource('services', 'ServiceController');
Route::put('services/active/{id}', 'ServiceController@active')
    ->name('active.service');
    ///export for services
Route::get('samples/services','sampleController@export_services')->name('export_services');
///import for services
Route::post('service/import_services','ServiceController@import_services')->name('import_services');
//export for model for services
Route::get('samples/services_model','ServiceController@export_model_service')->name('export_model_service');




// Offers
Route::resource('offers', 'OfferController');
Route::put('offers/active/{id}', 'OfferController@active')
    ->name('active.offer');
Route::get('offer/orders', 'OfferController@getAllOffersOrders')
    ->name('offers.orders');
Route::get('offer/order/{id}', 'OfferController@showOfferOrder')
    ->name('offer.order');
Route::post('worker_offer/{id}', 'OfferController@addWorkerToOffer')
    ->name('add.worker_offer');
Route::delete('worker_offer/{worker}/{offer}', 'OfferController@deleteWorkerFromOffer')
    ->name('worker_offer.destroy');
Route::put('worker_offer/{worker}/{offer}', 'OfferController@changeWorkerStatusInOffer')
    ->name('active.worker_offer');

// Reviews
Route::get('reviews/{role?}', 'ReviewController@index')
    ->name('reviews.index');
Route::delete('reviews/{id}', 'ReviewController@destroy')
    ->name('reviews.destroy')->where('id', '[0-9]+');

// Reports
Route::get('reports', 'ReportController@index')
    ->name('reports.index');

// Language Switcher
Route::get('lang={code}', 'LocaleController@lang');

// Icons Fetcher
Route::get('icons', "CategoryController@flatIcons");

Route::get('verifyPayment', "API\PaymentController@verifyPayment");

// Route::get('paypal/express-checkout', 'PaypalController@expressCheckout')->name('paypal.express-checkout');
// Route::get('paypal/express-checkout-success', 'PaypalController@expressCheckoutSuccess');
// Route::post('paypal/notify', 'PaypalController@notify');

// Notifications
Route::get('notifications/clear', 'NotificationController@clearAllNotifications');
Route::get('notifications/read', 'NotificationController@changeAllNotificationsStatus');

// Settings
Route::get('settings', 'SettingController@edit')
    ->name('admin.settings');
Route::put('settings', 'SettingController@update')
    ->name('update.settings');

// Complains
Route::resource('complains', 'ComplainController');
Route::put('complains/status/{id}', 'ComplainController@active')
    ->name('verify.complain');

// Chat
Route::resource('chats', 'ChatController');

//Slider

Route::resource('slider', 'SliderController');

//Partners

Route::resource('partners', 'PartnersController');
///contact-Users
Route::resource('contactUs', 'contactUsController');
//sample page for samples
Route::get('samples','sampleController@index')->name('index_sample');

//features
Route::resource('features', 'FeaturesController');

//technicals
Route::resource('technicals', 'TechnicalsController');





