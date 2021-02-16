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
                        <a href="{{ route('services.index') }}">
                            {{ $mainTitle }}
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
                <a class="dropdown-item" href="{{route('services.edit', $service->id)}}">
                    <i class="ft-edit icon-right"></i>@lang('admin.edit')
                </a>
                <a id="tr_{{$service->id}}" href="#" class="delete_record dropdown-item"
                   data-url="{{route('services.destroy', $service->id)}}"
                   data-confirm-message="@lang("admin.service_delete_confirm|role:admin.the_service")"
                   data-success-message="@lang("admin.service_delete_success|role:admin.the_service")"
                   data-error-message="@lang("admin.service_delete_error|role:admin.the_service")"
                   data-ok="@lang('admin.delete')"
                   data-cancel="@lang('admin.cancel')"
                   data-token="{{csrf_token()}}"
                   data-redirect="{{route('services.index')}}">
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
                    <div class="card-content">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.name')</strong></span> :
                                                        <p style="display: inline;">
                                                            {{$service->name}}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.price')</strong></span> :
                                                        <button data-toggle="modal"
                                                                data-target="#inlineForm_Price_{{ $service->id }}"
                                                                style="padding: 0.25vw;color:#fff!important;display: inline;"
                                                                class="btn btn-primary show_prices_form"
                                                                title="@lang('admin.view')">
                                                            <i class="la la-money"></i>
                                                        </button>
                                                        @section('before_end')
                                                            @parent
                                                            <div class="modal fade text-left" id="inlineForm_Price_{{ $service->id }}" tabindex="-1"
                                                                 role="dialog" aria-labelledby="myModalLabel33" style="display: none;"
                                                                 aria-hidden="true">
                                                                <div class="modal-dialog" role="document">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <label class="modal-title text-text-bold-600" id="myModalLabel33">
                                                                                @lang('admin.prices_per_country')
                                                                            </label>
                                                                            <button type="button" class="close"
                                                                                    data-dismiss="modal"
                                                                                    aria-label="Close">
                                                                                <span aria-hidden="true">×</span>
                                                                            </button>
                                                                        </div>
                                                                        <div class="modal-body">
                                                                            <div class="row">
                                                                                @foreach($countries as $country)
                                                                                    <div class="col-md-12">
                                                                                        <div class="form-group row">
                                                                                            <label class="col-md-5 label-control" for="name"
                                                                                                   style="padding: 0.75rem 1rem;">{{ $country->name }} </label>
                                                                                            <label class="col-md-1 label-control" for="name"
                                                                                                   style="padding: 0.75rem 1rem;">:</label>
                                                                                            <label class="col-md-4 label-control" for="name"
                                                                                                   style="padding: 0.75rem 1rem;">{{ getPriceByCountry($service->id, $country->id) }} </label>
                                                                                            <label class="col-md-2 label-control" for="name"
                                                                                                   style="padding: 0.75rem 1rem;">{{ $country->currency }} </label>
                                                                                        </div>
                                                                                    </div>
                                                                                @endforeach
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        @endsection
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.the_category')</strong></span> :
                                                        <p style="display: inline;">
                                                            {{$service->category->name}}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.status')</strong></span> :
                                                        <p style="display: inline;">
                                                            @if ($service->status == true)
                                                                <i class="ft-check-circle" title="@lang('admin.active')"
                                                                   style="color:green"></i>
                                                                @lang('admin.s_verified')
                                                            @else
                                                                <i class="ft-x-circle" title="@lang('admin.un_active')"
                                                                   style="color:red"></i>
                                                                @lang('admin.s_un_verified')
                                                            @endif
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
