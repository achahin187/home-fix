@extends('layouts.app')

@section('title') {{ $title }} @endsection

@section('content-header')
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title">
            {{ $title }}
            <bdi>
                @if ($country->status == true)
                    <i class="ft-check-circle"
                       style="color: #28d094;"
                       title="@lang('admin.active')"></i>
                @else
                    <i class="ft-x-circle red"
                       title="@lang('admin.un_active')"></i>
                @endif
            </bdi>
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
                        <a href="{{ route('countries.index') }}">
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
                <a class="dropdown-item" href="{{route('countries.edit', $country->id)}}">
                    <i class="ft-edit icon-right"></i>@lang('admin.edit')
                </a>
                <a id="tr_{{$country->id}}" href="#" class="delete_record dropdown-item"
                   data-url="{{route('countries.destroy', $country->id)}}"
                   data-confirm-message="@lang("admin.fdelete_confirm|role:admin.the_country")"
                   data-success-message="@lang("admin.fdelete_success|role:admin.the_country")"
                   data-error-message="@lang("admin.fdelete_error|role:admin.the_country")"
                   data-ok="@lang('admin.delete')"
                   data-cancel="@lang('admin.cancel')"
                   data-token="{{csrf_token()}}"
                   data-redirect="{{route('countries.index')}}">
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
                                <div class="col-sm-6">
                                    <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                        <div class="card-content">
                                            <div class="card-body">
                                                <span><strong>@lang('admin.name')</strong></span> :
                                                <p style="display: inline;">
                                                    {{$country->name}}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                        <div class="card-content">
                                            <div class="card-body">
                                                <span><strong>@lang('admin.currency')</strong></span> :
                                                <p style="display: inline;">
                                                    {{$country->currency}}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                        <div class="card-content">
                                            <div class="card-body">
                                                <span><strong>@lang('admin.max_length')</strong></span> :
                                                <p style="display: inline;">
                                                    {{$country->max_length}}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="card">
                                        <div class="card-content collapse show">
                                            <div class="card-body card-dashboard">
                                                <div class="card-title text-center font-medium-5 font-weight-bolder">
                                                    @lang('admin.cities')
                                                    <button data-toggle="modal" data-target="#inlineForm"
                                                            class="btn btn-primary pull-left">
                                                        <i class="ft-edit icon-right"></i>@lang('admin.add_new_city')
                                                    </button>
                                                </div>
                                                <table style="width:100%"
                                                       class="table table-striped table-bordered file-export table-responsive-1y1">
                                                    <thead>
                                                    <tr class="text-center">
                                                        <th>#</th>
                                                        <th>#</th>
                                                        <th>@lang('admin.name')</th>
                                                        <th>@lang('admin.status')</th>
                                                        <th>@lang('admin.settings')</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {? $counter = 0 ?}
                                                    @foreach($country->cities as $city)
                                                        <tr class="text-center" id="tr_{{ $city->id }}">
                                                            <th><input type="checkbox" id="checkbox_{{ $city->id }}"></th>
                                                            <th>{{ ++$counter }}</th>
                                                            <th>{{ $city->name }}</th>
                                                            <th class="text-center">
                                                                <a id="tr_{{$city->id}}" href="#" class="verify_user"
                                                                   style="padding: 0.25vw;"
                                                                   data-url="{{route('active.city', $city->id)}}"
                                                                   data-cancel="@lang('admin.cancel')"
                                                                   data-token="{{csrf_token()}}"
                                                                   @if ($city->status == false)
                                                                   data-confirm-message="@lang("admin.fverify_confirm|role:admin.the_city")"
                                                                   data-success-message="@lang("admin.fverify_success|role:admin.the_city")"
                                                                   data-error-message="@lang("admin.fverify_error|role:admin.the_city")"
                                                                   data-ok="@lang('admin.verify_user')"
                                                                   title="@lang('admin.verify_user')">
                                                                    <i class="ft-x-circle" style="color: red;"></i>
                                                                    @else
                                                                        data-confirm-message="@lang("admin.funverify_confirm|role:admin.the_city")"
                                                                        data-success-message="@lang("admin.funverify_success|role:admin.the_city")"
                                                                        data-error-message="@lang("admin.funverify_error|role:admin.the_city")"
                                                                        data-ok="@lang('admin.unverify_user')"
                                                                        title="@lang('admin.unverify_user')">
                                                                        <i class="ft-check-circle" style="color: green;"></i>
                                                                    @endif
                                                                </a>
                                                            </th>
                                                            <th style="border-right: 1px solid #E3EBF3">
                                                                <button data-toggle="modal" data-target="#inlineForm_{{$city->id}}"
                                                                        style="padding: 0.25vw;"
                                                                        class="btn btn-success"
                                                                        title="@lang('admin.edit')">
                                                                    <i class="ft-edit"></i>
                                                                </button>
                                                                <a id="tr_{{$city->id}}" href="#"
                                                                   class="delete_record btn btn-danger"
                                                                   style="padding: 0.25vw;"
                                                                   data-url="{{route('cities.destroy', $city->id)}}"
                                                                   data-confirm-message="@lang("admin.fdelete_confirm|role:admin.the_city")"
                                                                   data-success-message="@lang("admin.fdelete_success|role:admin.the_city")"
                                                                   data-error-message="@lang("admin.fdelete_error|role:admin.the_city")"
                                                                   data-ok="@lang('admin.delete')"
                                                                   data-cancel="@lang('admin.cancel')"
                                                                   data-token="{{csrf_token()}}"
                                                                   title="@lang('admin.delete')">
                                                                    <i class="ft-trash-2"></i>
                                                                </a>
                                                            </th>
                                                        </tr>
                                                    @section('before_end')
                                                        @parent
                                                        <div class="modal fade text-left" id="inlineForm_{{ $city->id }}" tabindex="-1"
                                                             role="dialog" aria-labelledby="myModalLabel33" style="display: none;"
                                                             aria-hidden="true">
                                                            <div class="modal-dialog" role="document">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <label class="modal-title text-text-bold-600" id="myModalLabel33">
                                                                            @lang('admin.city_edit') ( {{$city->id}} )
                                                                        </label>
                                                                        <button type="button" class="close" data-dismiss="modal"
                                                                                aria-label="Close">
                                                                            <span aria-hidden="true">×</span>
                                                                        </button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <form method="POST"
                                                                              action="{{ route('cities.update', $city->id) }}"
                                                                              style="text-align: right;"
                                                                              enctype="multipart/form-data">
                                                                            @csrf
                                                                            {{method_field('PUT')}}
                                                                            <div class="form-body">
                                                                                <div class="row">
                                                                                    <div class="col-md-12">
                                                                                        <div class="form-group row">
                                                                                            <label class="col-md-3 label-control" for="name"
                                                                                                   style="padding: 0.75rem 1rem;">@lang('admin.name')</label>
                                                                                            <div class="col-md-9">
                                                                                                <fieldset>
                                                                                                    <div class="input-group">
                                                                                                        <div class="input-group-prepend">
                                                                                                        <span class="input-group-text" id="basic-addon3"><i
                                                                                                                class="ft-map"></i></span>
                                                                                                        </div>
                                                                                                        <input id="name" type="text"
                                                                                                               class="form-control @error('name') is-invalid @enderror"
                                                                                                               name="name" value="@if (old('name')){{old('name')}}@else{{$city->name}}@endif" required
                                                                                                               autocomplete="name">
                                                                                                        @error('name')
                                                                                                        <span class="invalid-feedback" role="alert">
                                                                                                            <strong>{{ $message }}</strong>
                                                                                                        </span>
                                                                                                        @enderror
                                                                                                    </div>
                                                                                                </fieldset>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div class="text-right">
                                                                                <input type="submit" class="btn btn-primary" value="@lang('admin.save')">
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    @endsection
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
                                                data-page="/cities/"
                                                data-token="{{csrf_token()}}"
                                                style="margin-top: 1%;padding: 1%;">
                                                @lang('admin.delete_all')</button>
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
@section('before_end')
    @parent
    <div class="modal fade text-left" id="inlineForm" tabindex="-1"
         role="dialog" aria-labelledby="myModalLabel33" style="display: none;"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <label class="modal-title text-text-bold-600" id="myModalLabel33">
                        @lang('admin.add_new_city')
                    </label>
                    <button type="button" class="close" data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="POST"
                          action="{{ route('create.city', $country->id) }}"
                          style="text-align: right;"
                          enctype="multipart/form-data">
                        @csrf
                        <div class="form-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group row">
                                        <label class="col-md-3 label-control" for="name"
                                               style="padding: 0.75rem 1rem;">@lang('admin.name')</label>
                                        <div class="col-md-9">
                                            <fieldset>
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon3"><i
                                                            class="ft-map"></i></span>
                                                    </div>
                                                    <input id="name" type="text"
                                                           class="form-control @error('name') is-invalid @enderror"
                                                           name="name" value="{{ old('name') }}" required
                                                           autocomplete="name">
                                                    @error('name')
                                                    <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong></span>
                                                    @enderror
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            <input type="submit" class="btn btn-primary" value="@lang('admin.save')">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
