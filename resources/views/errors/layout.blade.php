<!DOCTYPE html>
<html class="loading" lang="{{ app()->getLocale() }}" data-textdirection="@lang('app.direction')">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <title>{{ config('app.name') }}</title>
    <!-- Favicons Impelementation -->
    <link rel="apple-touch-icon" sizes="120x120" href="{{ asset('images/ico/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/ico/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('images/ico/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('images/ico/site.webmanifest') }}">
    <link rel="mask-icon" href="{{ asset('images/ico/safari-pinned-tab.svg') }}" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">

    <link href="https://fonts.googleapis.com/earlyaccess/notonaskharabicui.css" rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Quicksand:300,400,500,700"
        rel="stylesheet">
    <!-- BEGIN VENDOR CSS-->
    <link rel="stylesheet" type="text/css" href="{{asset('css-'.trans('app.direction').'/vendors.css') }}">
    <link rel="stylesheet" type="text/css" href="{{asset('css-'.trans('app.direction').'/pages/error.css') }}">
    <link rel="stylesheet" type="text/css" href="{{asset('vendors/css/tables/datatable/datatables.min.css') }}">
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
    <!-- END APP CSS-->
    <!-- BEGIN CUSTOM CSS-->
    <link rel="stylesheet" type="text/css"
          href="{{asset('css-'.trans('app.direction').'/custom-'.trans('app.direction').'.css') }}">
    <!-- END CUSTOM CSS-->
</head>
<body class="vertical-layout vertical-menu 1-column   menu-expanded blank-page blank-page"
      data-open="click" data-menu="vertical-menu" data-col="1-column">
<style>
    *, h1, h2, h3, h4, h5, h6, p {
        font-family: 'Noto Naskh Arabic UI', sans-serif;
    }

    .flexbox-container {
        height: 93vh !important;
    }

    .footer {
        height: 7vh !important;
    }

    .back-to-home {
        margin: 0 auto;
    }

    .back-to-home a {
        font-weight: bold;
        font-size: 1.25em;
    }
</style>
<div class="app-content content">
    <div class="content-wrapper">
        <div class="content-header row">
        </div>
        <div class="content-body">
            <section class="flexbox-container">
                <div class="col-12 d-flex align-items-center justify-content-center">
                    <div class="col-md-4 col-10 p-0">
                        @yield('content')
                        <div class="card-content">
                            <div class="row py-2">
                                <div class="col-12 col-sm-6 col-md-6 back-to-home">
                                    <a href="{{ route('home') }}" class="btn btn-primary btn-block"><i
                                            class="ft-home icon-right"></i>@lang('app.back_to_home')</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="footer footer-static footer-light navbar-border navbar-shadow">
                <p class="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
                    <span class="float-md-left d-block d-md-inline-block">@lang('admin.copy')</span>
                    <span
                        class="float-md-right d-block d-md-inline-blockd-none d-lg-block">@lang('admin.powered')</span>
                </p>
            </footer>
        </div>
    </div>
</div>
</body>
</html>
