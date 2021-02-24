@extends('layouts.app')

@section('title') {{ $title }} @endsection

@section('content-header')
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title">{{ $title }}</h3>
        <div class="row breadcrumbs-top">
            <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin') }}">
                            @lang('admin.control_panel')
                        </a>
                    </li>
                    <li class="breadcrumb-item">
                        <a href="{{ route('workers.index') }}">
                            {{ __('admin.worker_management')}}
                        </a>
                    </li>
                </ol>
            </div>
        </div>
    </div>
    <div class="content-header-right col-md-6 col-12">
        <div class="btn-group float-md-right" role="group" aria-label="Button group with nested dropdown">
            <button class="btn btn-info round dropdown-toggle dropdown-menu-right box-shadow-2 px-2" id="btnGroupDrop1"
                    type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i
                    class="ft-settings icon-left"></i> @lang('admin.settings')
            </button>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <a class="dropdown-item" href="{{route('workers.edit', $worker->id)}}">
                    <i class="ft-edit icon-right"></i>@lang('admin.edit')
                </a>
                <a id="tr_{{$worker->id}}" href="#" class="delete_record dropdown-item"
                   data-url="{{route('workers.destroy', $worker->id)}}"
                   data-confirm-message="@lang("admin.delete_confirm|role:admin.the_worker")"
                   data-success-message="@lang("admin.delete_success|role:admin.the_worker")"
                   data-error-message="@lang("admin.delete_error|role:admin.the_worker")"
                   data-ok="@lang('admin.delete')"
                   data-cancel="@lang('admin.cancel')"
                   data-token="{{csrf_token()}}"
                   data-redirect="{{route('workers.index')}}">
                    <i class="ft-trash-2 icon-right"></i>@lang('admin.delete')
                </a>
            </div>
        </div>
    </div>
@endsection

@section('content')
    <section id="horizontal-form-layouts">
        <div class="row">
            <div class="col-md-12">
                <div>
                    <div class="card pull-up">
                        <div class="card-header">
                        </div>
                        <div class="card-content">
                            <div class="card-body pt-0">
                                <div class="row">
                                    <div class="col-sm-4 border-right-blue-grey border-right-lighten-5 text-center">
                                        <h6 class="danger text-bold-600">@lang('admin.order_count')</h6>
                                        <h4 class="font-large-2 text-bold-400 data_to_fit">
                                            {{count($worker->workerOrders)}}</h4>
                                        <p class="blue-grey lighten-2 mb-0">
                                            {{ trans_choice('admin.order', count($worker->workerOrders))}}</p>
                                    </div>
                                    <div class="col-sm-4 text-center">
                                        <h6 class="success text-bold-600">@lang('admin.total_missions')</h6>
                                        <h4 class="font-large-2 text-bold-400 data_to_fit">{{$totalOrderPrice}}</h4>
                                        <p class="blue-grey lighten-2 mb-0">{{ $worker->user_address['currency'] }}</p>
                                    </div>
                                    <div class="col-sm-4 text-center border-right-blue-grey border-right-lighten-5">
                                        <h6 class="warning text-bold-600">@lang('admin.reviews')</h6>
                                        <h4 class="font-large-2 text-bold-400 data_to_fit">{{round($worker->review, 2)}}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-9 match-height">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.email')</strong></span> :
                                                        <p style="display: inline;">{{$worker->email}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.phone')</strong></span> :
                                                        <p style="display: inline;">{{$worker->phone}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <p style="display: inline;">
                                                            <strong>@lang('admin.the_country'):</strong>
                                                            {{ $worker->user_address['country'] }}<br>
                                                            <strong>@lang('admin.the_city'):</strong>
                                                            {{ $worker->user_address['city'] }}<br>
                                                            <strong>@lang('admin.the_area'):</strong>
                                                            {{ $worker->user_address['area'] }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.user_status')</strong></span> :
                                                        <p style="display: inline;">
                                                            @if ($worker->verified == 1)
                                                                @lang('admin.verified')
                                                                <i class="ft-user-check" style="color:green"></i>
                                                            @else
                                                                @lang('admin.un_verified')
                                                                <i class="ft-x-circle" style="color:red"></i>
                                                            @endif
                                                            |
                                                            @if ($worker->ban == 0)
                                                                @lang('admin.un_ban')
                                                                <i class="ft-check-circle" style="color:green"></i>
                                                            @else
                                                                @lang('admin.ban')
                                                                <i class="ft-x-circle" style="color:red"></i>
                                                            @endif
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.the_category')</strong></span> :
                                                        <p style="display: inline;font-weight: bold;">{!! $categories !!}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3 match-height">
                                    <div class="row">
                                        <div class="col-sm-12 pull-right card border-blue border-lighten-2">
                                            <img src="/{{$worker->avatar}}"
                                                 class="rounded-circle width-100-per height-150"
                                                 alt="User image">
                                        </div>
                                        <div class="col-sm-12 pull-right card border-blue border-lighten-2">
                                            <img src="{{$worker->badge_path}}"
                                                 class="rounded-circle width-100-per height-150"
                                                 alt="User image" title="{{ $worker->badge == 1 ? trans('admin.certified') : trans('admin.un_certified') }}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                        <div class="card-content">
                                            <div class="card-body">
                                                <span><strong>@lang('admin.cv')</strong></span> :
                                                <p style="display: inline;">
                                                    @if ($worker->cv !== '')
                                                        <a href="/{{ $worker->cv_path }}">
                                                            Download
                                                        </a>
                                                    @else
                                                        <a href="#">No CV</a>
                                                    @endif
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                        <div class="card-content">
                                            <div class="card-body">
                                                <span><strong>@lang('admin.identity')</strong></span> :
                                                <p style="display: inline;">
                                                    @if ($worker->identity !== '')
                                                        <a href="/{{ $worker->id_path }}">
                                                            Download
                                                        </a>
                                                    @else
                                                        <a href="#">No Identity</a>
                                                    @endif
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="embed-responsive embed-responsive-1by1">
                                        <iframe style="width: 100%; height: 25vw;"
                                                src="https://maps.google.com/maps?q={{$worker->latitude}},{{$worker->longitude}}&t=k&z=10&output=embed"
                                                frameborder="0" scrolling="no" marginheight="0"
                                                marginwidth="0">
                                        </iframe>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
