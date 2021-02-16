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
            <a href="{{ route('services.create') }}">
                <button class="btn btn-info round box-shadow-2 px-2"
                        type="button"><i class="ft-edit icon-left"></i>@lang('admin.add_service')
                </button>
            </a>
        </div>
    </div>
@endsection

@section('content')
    <section id="file-export">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header" style="padding: 0;">
                        <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
                        <div class="heading-elements">
                            <ul class="list-inline mb-0">
                                <li><a data-action="expand"><i class="ft-maximize"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-content collapse show">
                        <div class="card-body card-dashboard">
                            <table style="width:100%"
                                   class="table table-striped table-bordered file-export table-responsive-1y1">
                                <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>#</th>
                                    <th>@lang('admin.name')</th>
                                    <th>@lang('admin.prices_per_country')</th>
                                    <th>@lang('admin.the_category')</th>
                                    <th>@lang('admin.status')</th>
                                    <th style="border-right: 1px solid #E3EBF3">@lang('admin.settings')</th>
                                </tr>
                                </thead>
                                <tbody>
                                {? $counter = 0 ?}
                                @foreach($services as $service)
                                    <tr class="text-center" id="tr_{{ $service->id }}">
                                        <th><input type="checkbox" id="checkbox_{{ $service->id }}"></th>
                                        <th class="text-center">{{ ++$counter }}</th>
                                        <th>
                                            <a href="{{ route('services.show', $service->id) }}">
                                                {{ $service->name }}
                                            </a>
                                        </th>
                                        <th class="text-center">
                                            <button data-toggle="modal"
                                                    data-target="#inlineForm_Price_{{ $service->id }}"
                                                    style="padding: 0.25vw;color:#fff!important"
                                                    class="btn btn-primary show_prices_form"
                                                    title="@lang('admin.view')">
                                                <i class="la la-money"></i>
                                            </button>
                                        </th>
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
                                                            <button type="button" class="close" data-dismiss="modal"
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
                                        <th class="text-center">
                                            <a href="{{ route('categories.show', $service->parent_category->id) }}">
                                                {{ $service->parent_category->name }}
                                            </a>
                                            /
                                            <a href="{{ route('sub.show', $service->category->id) }}">
                                                {{ $service->category->name }}
                                            </a>
                                        </th>
                                        <th class="text-center">
                                            <a id="tr_{{$service->id}}" href="#" class="verify_user"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('active.service', $service->id)}}"
                                               data-cancel="@lang('admin.cancel')"
                                               data-token="{{csrf_token()}}"
                                               @if ($service->status == false)
                                               data-confirm-message="@lang("admin.service_verify_confirm|role:admin.the_service")"
                                               data-success-message="@lang("admin.service_verify_success|role:admin.the_service")"
                                               data-error-message="@lang("admin.service_verify_error|role:admin.the_service")"
                                               data-ok="@lang('admin.verify_user')"
                                               title="@lang('admin.verify_user')">
                                                <i class="ft-x-circle" style="color: red;"></i>
                                                @else
                                                    data-confirm-message="@lang("admin.service_unverify_confirm|role:admin.the_service")"
                                                    data-success-message="@lang("admin.service_unverify_success|role:admin.the_service")"
                                                    data-error-message="@lang("admin.service_unverify_error|role:admin.the_service")"
                                                    data-ok="@lang('admin.unverify_user')"
                                                    title="@lang('admin.unverify_user')">
                                                    <i class="ft-check-circle" style="color: green;"></i>
                                                @endif
                                            </a>
                                        </th>
                                        <th style="border-right: 1px solid #E3EBF3">
                                            <a href="{{route('services.edit', $service->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.edit')" class="btn btn-success">
                                                <i class="ft-edit"></i>
                                            </a>
                                            <a href="{{route('services.show', $service->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.view')" class="btn btn-info">
                                                <i class="ft-eye"></i>
                                            </a>
                                            <a id="tr_{{$service->id}}" href="#" class="delete_record btn btn-danger"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('services.destroy', $service->id)}}"
                                               data-confirm-message="@lang("admin.service_delete_confirm|role:admin.the_service")"
                                               data-success-message="@lang("admin.service_delete_success|role:admin.the_service")"
                                               data-error-message="@lang("admin.service_delete_error|role:admin.the_service")"
                                               data-ok="@lang('admin.delete')"
                                               data-cancel="@lang('admin.cancel')"
                                               data-token="{{csrf_token()}}"
                                               title="@lang('admin.delete')">
                                                <i class="ft-trash-2"></i>
                                            </a>
                                        </th>
                                    </>
                                @endforeach
                                </tbody>
                            </table>
                            <button class="btn btn-info" id="select_all"
                            style="margin-top: 1%;padding: 1%;">
                            @lang('admin.select_all')</button>
                            <button class="btn btn-info" id="deselect_all"
                            style="margin-top: 1%;padding: 1%;">
                            @lang('admin.deselect_all')</button>
                            <button class="btn btn-danger" id="delete_all"
                            data-confirm-message="@lang('admin.delete_all_confirmation')"
                            data-page="/services/"
                            data-token="{{csrf_token()}}"
                            style="margin-top: 1%;padding: 1%;">
                            @lang('admin.delete_all')</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
