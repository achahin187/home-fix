<?php

Route::group([
    'namespace' => 'API'
], function () {
    Route::post('verifyPayment', 'PaymentController@verifyPayment');

    // Authentication
    Route::group([
        'prefix' => 'auth'
    ], function () {
        Route::get('register/get', 'AuthController@register');
        Route::post('register/{role}', 'AuthController@register');
        Route::post('password/reset', 'AuthController@resetPassword');
        Route::get('register/category', 'AuthController@category');
        Route::post('login', 'AuthController@login');
        Route::post('social', 'AuthController@socialLogin');
        Route::post('setnotifications_key','AuthController@setnotifications_key');
    });

    // Terms
    Route::group([
        'prefix' => 'terms'
    ], function () {
        Route::get('/', 'TermController@index');
    });

    Route::group([
        'middleware' => ['auth:token']
    ], function () {
        Route::post('activate', 'AuthController@verifiyPhone')
            ->where('token', '[0-9]+');
        Route::post('activate/resend', 'AuthController@resendActivationCode');

        // User Profile
        Route::group([
            'prefix' => 'user'
        ], function () {
            Route::get('/', 'ProfileController@getUserInformation');
            Route::post('/', 'ProfileController@setUserInformation');
            Route::post('/avatar', 'ProfileController@setUserAvatar');
            Route::post('/password', 'ProfileController@setUserPassword');
            Route::post('/location', 'ProfileController@setUserLocation');
            Route::get('logout', 'AuthController@logout');
            Route::post('language', 'AuthController@setLanguage');
        });
        ///update_country_city
        Route::group(['prefix' => 'update' ], function () {
            Route::post('/country_city', 'ProfileController@setCountry');

        });

        // Categories
        Route::group([
            'prefix' => 'categories'
        ], function () {
            Route::get('/', 'CategoryController@getAllCategories');
         Route::get('/workerCategory','CategoryController@getWorkerCategories');
            Route::post('/workerCategory','CategoryController@setWorkerCategory');
        });

        // Complains
        Route::group([
            'prefix' => 'complains'
        ], function () {
            Route::get('/', 'ComplainController@getAllComplains');
            Route::post('/', 'ComplainController@pushComplain');
        });

        // Services
        Route::group([
            'prefix' => 'services'
        ], function () {
            Route::post('/', 'CategoryController@searchInServices');
        });

        // Offers
        Route::group([
            'prefix' => 'offers'
        ], function () {
            Route::get('/', 'OfferController@getAllOffers');
            Route::post('/order', 'OfferController@orderAnOffer')
                ->where('id', '[0-9]+');
            Route::get('/m', 'OfferController@getUserOffers');
            Route::post('/join', 'OfferController@joinAnOffer');
            Route::post('/disjoin', 'OfferController@disjoinAnOffer');
        });

        // Reviews
        Route::group([
            'prefix' => 'reviews'
        ], function () {
            Route::get('/', 'ReviewController@getAllReviews');
            Route::post('/pushReview', 'ReviewController@pushReview');
        });

        // Chat
        Route::group([
            'prefix' => 'messages'
        ], function () {
            Route::get('/', 'ChatController@fetchMessages')
                ->where('id', '[0-9]+');
            Route::post('/', 'ChatController@sendMessage')
                ->where('id', '[0-9]+');
        });

        // Chat For IOS
        Route::group([
            'prefix' => 'conversations'
        ], function () {
            Route::get('/', 'ChatController@fetchConversations');
            Route::get('/{id}', 'ChatController@fetchConversationsById');
            Route::post('/{id}', 'ChatController@sendMessageToConversation');
        });

        // Orders
        Route::group([
            'prefix' => 'orders'
        ], function () {
            Route::get('/', 'OrderController@getAllOrders');
            Route::get('/completed', 'OrderController@getAllCompletedOrders');
            Route::get('/getOrderDetails', 'OrderController@getOrderInformation');
            Route::post('/state', 'OrderController@changeOrderStatus');
            Route::post('/create', 'OrderController@createNewOrder');
            Route::post('/cancel', 'OrderController@cancelOrder');
            Route::post('/note/accept', 'OrderController@acceptOrderNotes');
            Route::post('/note', 'OrderController@createOrderNote');
            Route::post('/verifyPayment', 'PaymentController@verifyPayment');

        });

        // Notifications
        Route::group([
            'prefix' => 'notifications'
        ], function () {
            Route::get('/', 'AppNotificationController@getNotifications');
            Route::get('/readAll', 'AppNotificationController@makeAllAsRead');
            Route::get('/clearAll', 'AppNotificationController@clearAllNotifications');
        });
    });
    ///apis for website
    Route::post('set/avater', 'ProfileController@setAvatarFromWeb');
    Route::post('set/identity', 'ProfileController@setIdentityFromWeb');
    Route::post('set/cv', 'ProfileController@setCVFromWeb');
    Route::post('order/cancel', 'OrderController@cancelOrderFromWeb');


});
