<!DOCTYPE html>
<html class="loading" lang="{{ app()->getLocale() }}" data-textdirection="@lang('app.direction')">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <title>{{ config('app.name') }} | @yield('title')</title>
    <!-- Favicons Impelementation -->
    <link rel="apple-touch-icon" sizes="120x120" href="{{ asset('images/ico/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/ico/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('images/ico/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('images/ico/site.webmanifest') }}">
    <link rel="mask-icon" href="{{ asset('images/ico/safari-pinned-tab.svg') }}" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">

    <link href="https://fonts.googleapis.com/earlyaccess/notonaskharabicui.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Quicksand:300,400,500,700"
        rel="stylesheet">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/fontawesome.min.css" integrity="sha512-shT5e46zNSD6lt4dlJHb+7LoUko9QZXTGlmWWx0qjI9UhQrElRb+Q5DM7SVte9G9ZNmovz2qIaV7IWv0xQkBkw==" crossorigin="anonymous" />
    <!-- BEGIN VENDOR CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset('css-'.trans('app.direction').'/vendors.css') }}">
    <link rel="stylesheet" type="text/css" href="{{asset('css-'.trans('app.direction').'/pages/error.css') }}">
    <link rel="stylesheet" type="text/css" href="{{asset('vendors/css/tables/datatable/datatables.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{asset('vendors/css/extensions/raty/jquery.raty.css') }}">
    <link rel="stylesheet" type="text/css" href="{{asset('vendors/css/bootstrap-select/bootstrap-select.css') }}">
    <link rel="stylesheet" type="text/css"
        href="{{asset('vendors/css/tables/extensions/fixedHeader.dataTables.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('vendors/css/ui/jquery-ui.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{asset('vendors/css/extensions/sweetalert.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('fonts/simple-line-icons/style.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('fonts/line-awesome/css/style.css')}}">
    <!-- END VENDOR CSS-->
    <!-- BEGIN APP CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset('css-'.trans('app.direction').'/app.css') }}">
    <link rel="stylesheet" type="text/css"
        href="{{asset('css-'.trans('app.direction').'/core/menu/menu-types/vertical-menu.css') }}">
    <link rel="stylesheet" type="text/css"
        href="{{asset('css-'.trans('app.direction').'/core/colors/palette-gradient.css') }}">
    <link rel="stylesheet" type="text/css"
        href="{{asset('css-'.trans('app.direction').'/core/colors/palette-callout.min.css') }}">
    <!-- END APP CSS-->
    <!-- BEGIN CUSTOM CSS-->
    <link rel="stylesheet" type="text/css"
        href="{{asset('css-'.trans('app.direction').'/custom-'.trans('app.direction').'.css') }}">
    <!-- END CUSTOM CSS-->
    @yield('header')
</head>

<body class="vertical-layout vertical-menu 2-columns   menu-expanded fixed-navbar" data-open="click"
    data-menu="vertical-menu" data-col="2-columns">

    <style>
        *,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
            font-family: 'Noto Naskh Arabic UI', sans-serif;
        }
    </style>
    <nav
        class="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-dark navbar-shadow">
        <div class="navbar-wrapper">
            <div class="navbar-header expanded">
                <ul class="nav navbar-nav flex-row">
                    <li class="nav-item mobile-menu d-md-none mr-auto"><a
                            class="nav-link nav-menu-main menu-toggle hidden-xs is-active" href="#"><i
                                class="ft-menu font-large-1"></i></a></li>
                    <li class="nav-item">
                        <a class="navbar-brand" href="{{ route('admin') }}">
                            <img class="brand-logo" alt="modern admin logo" src="{{ asset('images/logo/logo.png') }}">
                            <h3 class="brand-text">{{ config('app.name') }}</h3>
                        </a>
                    </li>
                    <li class="nav-item d-md-none">
                        <a class="nav-link open-navbar-container" data-toggle="collapse" data-target="#navbar-mobile"><i
                                class="la la-ellipsis-v"></i></a>
                    </li>
                </ul>
            </div>
            <div class="navbar-container content">
                <div class="collapse navbar-collapse" id="navbar-mobile">
                    <ul class="nav navbar-nav mr-auto float-left">
                        <li class="nav-item d-none d-md-block"><a class="nav-link nav-menu-main menu-toggle hidden-xs"
                                href="#"><i class="ft-menu"></i></a></li>
                    </ul>
                    @if (auth()->check())
                    <ul class="nav navbar-nav float-right">
                        <li class="dropdown dropdown-user nav-item">
                            <a class="height-100-per dropdown-toggle nav-link dropdown-user-link" href="#"
                                data-toggle="dropdown" style="display: flex; align-items: center">
                                <span class="text-bold-700">
                                    {{ auth()->user()->name }}
                                </span>
                                {{--<span class="avatar avatar-online">
                                <img src="{{ auth()->user()->avatar }}"
                                alt="avatar"><i></i></span>--}}
                            </a>
                            <div class="dropdown-menu dropdown-menu-header">
                                <a class="dropdown-item" href="{{ route('profile') }}"><i
                                        class="ft-user"></i>@lang('admin.update_profile')</a>
                                <a class="dropdown-item" href="{{ route('logout') }}"><i class="ft-power"></i>
                                    @lang('admin.logout')
                                </a>
                            </div>
                        </li>
                        <li class="dropdown dropdown-notification nav-item" onclick="changeNotificationStatus()">
                            <a class="nav-link nav-link-label" href="#" data-toggle="dropdown" aria-expanded="false"><i
                                    class="ficon ft-bell"></i>
                                <span
                                    class="badge badge-pill badge-default badge-danger badge-default badge-up badge-glow notifications-count">
                                    {{ count($unreadNotifications) }}
                                </span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                <li class="dropdown-menu-header">
                                    <h6 class="dropdown-header m-0">
                                        <span class="grey darken-2">@lang('admin.notifications')</span>
                                    </h6>
                                </li>
                                <li class="notifications-container scrollable-container media-list w-100 ps-container ps-theme-dark"
                                    data-ps-id="7b995275-ae69-e5dc-758b-66ec9f256932">
                                    <style>
                                        .box {
                                            width: 100%;
                                            height: 100%;
                                            display: inline-block;
                                        }

                                        .overlay {
                                            position: relative;
                                        }

                                        .overlay:after {
                                            position: absolute;
                                            content: "";
                                            top: 0;
                                            left: 0;
                                            width: 100%;
                                            height: 100%;
                                            opacity: 0;
                                        }

                                        .overlay:after {
                                            opacity: .20;
                                        }

                                        .skyblue:after {
                                            background-color: skyblue;
                                        }

                                        .red:after {
                                            background-color: red;
                                        }
                                    </style>
                                    @if (count($notifications) > 0)
                                    @foreach($unreadNotifications as $notification)
                                    @if ($notification->data['type'] === 'worker')
                                    <a href="{{ route('offers.show',$notification->data['orderId'])}}"
                                        onclick="changeNotificationStatus()"
                                        class="box overlay skyblue notification-item">
                                        <div class="media">
                                            <div class="media-left align-self-center">
                                                <i class="ft-plus-square icon-bg-circle bg-cyan"></i></div>
                                            <div class="media-body">
                                                <h6 class="media-heading">@lang('admin.new_worker_in_offer')</h6>
                                                <small>
                                                    <time class="media-meta text-muted"
                                                        datetime="{{$notification->time}}">
                                                        {{$notification->time}}</time>
                                                </small>
                                            </div>
                                        </div>
                                    </a>
                                    @endif
                                    <a href="@if ($notification->data['type'] === 'order')
                                        {{ route('orders.show',$notification->data['orderId'])}}
                                        @else
                                        {{ route('offer.order',$notification->data['orderId'])}}
                                        @endif" onclick="changeNotificationStatus()"
                                        class="box overlay skyblue notification-item">
                                        <div class="media">
                                            <div class="media-left align-self-center">
                                                <i class="ft-plus-square icon-bg-circle bg-cyan"></i></div>
                                            <div class="media-body">
                                                <h6 class="media-heading">@lang('admin.new_order')</h6>
                                                <p class="notification-text font-small-3 text-muted">
                                                    @lang('admin.order_no'): {{$notification->data['order_no']}}
                                                    ( {{$notification->data['price']}}
                                                    )</p>
                                                <small>
                                                    <time class="media-meta text-muted"
                                                        datetime="{{$notification->time}}">
                                                        {{$notification->time}}</time>
                                                </small>
                                            </div>
                                        </div>
                                    </a>
                                    @endforeach
                                    @foreach($readNotifications as $notification)
                                    @if ($notification->data['type'] === 'worker')
                                    <a href="{{ route('offers.show',$notification->data['orderId'])}}"
                                        onclick="changeNotificationStatus()"
                                        class="box overlay skyblue notification-item">
                                        <div class="media">
                                            <div class="media-left align-self-center">
                                                <i class="ft-plus-square icon-bg-circle bg-cyan"></i></div>
                                            <div class="media-body">
                                                <h6 class="media-heading">@lang('admin.new_worker_in_offer')</h6>
                                                <small>
                                                    <time class="media-meta text-muted"
                                                        datetime="{{$notification->time}}">
                                                        {{$notification->time}}</time>
                                                </small>
                                            </div>
                                        </div>
                                    </a>
                                    @endif
                                    <a href="{{ route('orders.show',$notification->data['orderId'])}}"
                                        onclick="changeNotificationStatus()">
                                        <div class="media">
                                            <div class="media-left align-self-center"><i
                                                    class="ft-plus-square icon-bg-circle bg-cyan"></i></div>
                                            <div class="media-body">
                                                <h6 class="media-heading">@lang('admin.new_order')</h6>
                                                <p class="notification-text font-small-3 text-muted">
                                                    @lang('admin.order_no'): {{$notification->data['order_no']}}
                                                    ( {{$notification->data['price']}}
                                                    )</p>
                                                <small>
                                                    <time class="media-meta text-muted"
                                                        datetime="{{$notification->time}}">
                                                        {{$notification->time}}</time>
                                                </small>
                                            </div>
                                        </div>
                                    </a>
                                    @endforeach
                                    @else
                                    <a href="#">
                                        <div class="media">
                                            <div class="media-left align-self-center">
                                                <i class="ft-alert-triangle icon-bg-circle bg-red"></i></div>
                                            <div class="media-body">
                                                <h6 class="media-heading text-center font-medium-2 mr-0">
                                                    @lang('admin.no_notifications')</h6>
                                                <p class="notification-text font-small-3 text-muted"></p>
                                            </div>
                                        </div>
                                    </a>
                                    @endif
                                    <div class="no-notifications hidden">@lang('admin.no_notifications')</div>
                                    <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 3px;">
                                        <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                                    </div>
                                    <div class="ps-scrollbar-y-rail" style="top: 0px; right: -8px;">
                                        <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                                    </div>
                                </li>
                                <li class="dropdown-menu-footer notifications-clear">
                                    <a class="dropdown-item text-muted text-center" href="#"
                                        onclick="clearAllNotifications()">
                                        @lang('admin.all_notifications')
                                    </a></li>
                            </ul>
                        </li>
                        <li class="dropdown dropdown-language nav-item">
                            <a class="dropdown-toggle nav-link" id="dropdown-flag" href="#" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i
                                    class="flag-icon flag-icon-{{ Session::get('app.flag', config('app.flags')[config('app.locale')]) }}"></i><span
                                    class="selected-language"></span></a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-flag">
                                <a class="dropdown-item" href="/lang=ar"><i class="flag-icon flag-icon-kw"></i> عربي</a>
                                <a class="dropdown-item" href="/lang=en"><i class="flag-icon flag-icon-gb"></i>
                                    English</a>
                            </div>
                        </li>
                    </ul>
                    @endif
                </div>
            </div>
        </div>
    </nav>
    @include('layouts.sidebar')
    <div class="app-content content">
        <div class="content-wrapper">
            <div class="content-header row">
                @yield('content-header')
            </div>
            <div class="content-body">
                @include('opmessages')
                @yield('content')
            </div>
        </div>
    </div>
    <footer class="footer footer-static footer-light navbar-border navbar-shadow">
        <p class="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
            <span class="float-md-left d-block d-md-inline-block">@lang('admin.copy')</span>
            <span class="float-md-right d-block d-md-inline-blockd-none d-lg-block">@lang('admin.powered')</span>
        </p>
    </footer>
    <!-- BEGIN VENDOR JS-->
    <script src="{{ asset('vendors/js/vendors.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('vendors/js/tables/datatable/datatables.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('vendors/js/extensions/jquery.raty.js') }}" type="text/javascript"></script>
    <script src="{{ asset('vendors/js/tables/datatable/dataTables.fixedHeader.min.js') }}" type="text/javascript">
    </script>
    <script src="{{ asset('vendors/js/tables/datatable/dataTables.buttons.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('vendors/js/extensions/sweetalert.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('vendors/js/ui/jquery-ui.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('vendors/js/bootstrap-select/bootstrap-select.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/fitty.min.js') }}" type="text/javascript"></script>
    <!-- END VENDOR JS-->
    <!-- BEGIN APP JS-->
    <script src="{{ asset('js/core/app-menu.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/core/app.js') }}" type="text/javascript"></script>
    <!-- END APP JS-->
    <!-- START CUSTOM JS-->
    <script src="{{ asset('js/scripts.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/custom-'.trans('app.direction').'.js') }}" type="text/javascript"></script>
    <!-- START CUSTOM JS-->
    @yield('before_end')
</body>

</html>
