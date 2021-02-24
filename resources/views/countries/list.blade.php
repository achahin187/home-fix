@extends('layouts.app')

@section('title') {{ __('admin.country_management') }} @endsection

@section('content-header')
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title">{{ __('admin.country_management') }}</h3>
        <div class="row breadcrumbs-top">
            <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin') }}">
                            @lang('admin.control_panel')
                        </a>
                    </li>
                    <li class="breadcrumb-item">
                        <a href="{{ route('countries.index') }}">
                            {{ __('admin.country_management') }}
                        </a>
                    </li>
                </ol>
            </div>
        </div>
    </div>
    <div class="content-header-right col-md-6 col-12">
        <div class="btn-group float-md-right" role="group" aria-label="Button group with nested dropdown">
            <a href="{{ route('countries.create') }}">
                <button class="btn btn-info round box-shadow-2 px-2"
                        type="button"><i class="ft-edit icon-left"></i>@lang('admin.add_country')
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
                                    <th>@lang('admin.currency')</th>
                                    <th>@lang('admin.max_length')</th>

                                    <th>@lang('admin.cities')</th>
                                    <th>@lang('admin.status')</th>
                                    <th style="border-right: 1px solid #E3EBF3">@lang('admin.settings')</th>
                                </tr>
                                </thead>
                                <tbody>
                                {? $counter = 0 ?}
                                @foreach($countries as $country)
                                    <tr class="text-center" id="tr_{{ $country->id }}">
                                        <th><input type="checkbox" id="checkbox_{{ $country->id }}"></th>    <th class="text-center">{{ ++$counter }}</th>
                                        <th class="text-center">
                                            <a href="{{ route('countries.show', $country->id) }}">
                                                {{$country->name}}
                                            </a>
                                        </th>
                                        <th class="text-center">{{ $country->currency }}</th>
                                        <th class="text-center">{{ $country->max_length }}</th>

                                        <th class="text-center">{{ count($country->cities) }}</th>
                                        <th class="text-center">
                                            <a id="tr_{{$country->id}}" href="#" class="verify_user"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('active.country', $country->id)}}"
                                               data-cancel="@lang('admin.cancel')"
                                               data-token="{{csrf_token()}}"
                                               @if ($country->status == false)
                                               data-confirm-message="@lang("admin.fverify_confirm|role:admin.the_country")"
                                               data-success-message="@lang("admin.fverify_success|role:admin.the_country")"
                                               data-error-message="@lang("admin.fverify_error|role:admin.the_country")"
                                               data-ok="@lang('admin.verify_user')"
                                               title="@lang('admin.verify_user')">
                                                <i class="ft-x-circle" style="color: red;"></i>
                                                @else
                                                    data-confirm-message="@lang("admin.funverify_confirm|role:admin.the_country")"
                                                    data-success-message="@lang("admin.funverify_success|role:admin.the_country")"
                                                    data-error-message="@lang("admin.funverify_error|role:admin.the_country")"
                                                    data-ok="@lang('admin.unverify_user')"
                                                    title="@lang('admin.unverify_user')">
                                                    <i class="ft-check-circle" style="color: green;"></i>
                                                @endif
                                            </a>
                                        </th>
                                        <th style="border-right: 1px solid #E3EBF3">
                                            <a href="{{route('countries.edit', $country->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.edit')" class="btn btn-success">
                                                <i class="ft-edit"></i>
                                            </a>
                                            <a href="{{route('countries.show', $country->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.view')" class="btn btn-info">
                                                <i class="ft-eye"></i>
                                            </a>
                                            <a id="tr_{{$country->id}}" href="#" class="delete_record btn btn-danger"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('countries.destroy', $country->id)}}"
                                               data-confirm-message="@lang("admin.fdelete_confirm|role:admin.the_country")"
                                               data-success-message="@lang("admin.fdelete_success|role:admin.the_country")"
                                               data-error-message="@lang("admin.fdelete_error|role:admin.the_country")"
                                               data-ok="@lang('admin.delete')"
                                               data-cancel="@lang('admin.cancel')"
                                               data-token="{{csrf_token()}}"
                                               title="@lang('admin.delete')">
                                                <i class="ft-trash-2"></i>
                                            </a>
                                        </th>
                                    </tr>
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
                            data-page="/countries/"
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
