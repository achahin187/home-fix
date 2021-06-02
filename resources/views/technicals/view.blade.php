@extends('layouts.app')

@section('title') {{ $title }} @endsection

@section('content-header')
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title">
            {{ $title }}
        </h3>
        <div class="row breadcrumbs-top">
            <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin') }}">
                            @lang('admin.control_panel')
                        </a>
                    </li>
                    <li class="breadcrumb-item">
                        <a href="{{ route('technicals.index') }}">
                            {{ __('admin.view_technical')}}
                        </a>
                    </li>
                </ol>
            </div>
        </div>
    </div>
   
@endsection

@section('content')
    <section id="horizontal-form-layouts">
        <div class="row">
            <div class="col-md-12">
                <div>
                    <div class="card-content">
                        <div class="card-body">
                            
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span>
                                                            <strong>العنوان</strong>
                                                        </span> :
                                                        <p style="display: inline;">
                                                            {{$technical->{App::getLocale().'_title'} }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>الوصف</strong></span> :
                                                        <p style="display: inline;">
                                                        {{$technical->{App::getLocale().'_section'} }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
@endsection

