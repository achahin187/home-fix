@extends('layouts.app')

@section('title') {{ $title }} @endsection

@section('content-header')
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title">
            {{ $title }}
            <bdi>
                @if ($category->status == true)
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
                        <a href="{{ route('categories.index') }}">
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
                <a class="dropdown-item" href="{{route('categories.edit', $category->id)}}">
                    <i class="ft-edit icon-right"></i>@lang('admin.edit')
                </a>
                <a id="tr_{{$category->id}}" href="#" class="delete_record dropdown-item"
                   data-url="{{route('categories.destroy', $category->id)}}"
                   data-confirm-message="@lang("admin.delete_confirm|role:admin.the_category")"
                   data-success-message="@lang("admin.delete_success|role:admin.the_category")"
                   data-error-message="@lang("admin.delete_error|role:admin.the_category")"
                   data-ok="@lang('admin.delete')"
                   data-cancel="@lang('admin.cancel')"
                   data-token="{{csrf_token()}}"
                   data-redirect="{{route('categories.index')}}">
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
                                <div class="col-sm-9">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.name')</strong></span> :
                                                        <p style="display: inline;">
                                                            {{$category->name}}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.quick_price')</strong></span> :
                                                        <button data-toggle="modal"
                                                                data-target="#inlineForm_Price_{{ $category->id }}"
                                                                style="padding: 0.25vw;color:#fff!important;display: inline;"
                                                                class="btn btn-primary show_prices_form"
                                                                title="@lang('admin.view')">
                                                            <i class="la la-money"></i>
                                                        </button>
                                                        @section('before_end')
                                                            @parent
                                                            <div class="modal fade text-left" id="inlineForm_Price_{{ $category->id }}" tabindex="-1"
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
                                                                                                   style="padding: 0.75rem 1rem;">{{ getPriceByCountry($category->quick->id, $country->id) }} </label>
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
                                        </div>                                    </div>
                                </div>
                                <div class="col-sm-3 pull-right">
                                    <div class="card border-blue border-lighten-2">
                                        <div class="text-center">
                                            <div class="card-body" style="padding: .5vw;">
                                                <img src="{{config('app.url')}}/{{$category->image}}"
                                                     class="width-100-per height-150"
                                                     alt="category image">
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
                                                    @lang('admin.child_categories')
                                                </div>
                                                <table style="width:100%"
                                                       class="table table-striped table-bordered file-export table-responsive-1y1">
                                                    <thead>
                                                    <tr class="text-center">
                                                        <th>#</th>
                                                        <th>#</th>
                                                        <th>@lang('admin.name')</th>
                                                        <th>@lang('admin.checkup_price')</th>
                                                        <th>@lang('admin.services')</th>
                                                        <th>@lang('admin.status')</th>
                                                        <th>@lang('admin.settings')</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {? $counter = 0 ?}
                                                    @foreach($category->subCategories as $cat)
                                                        <tr class="text-center" id="tr_{{ $cat->id }}">
                                                            <th><input type="checkbox" id="checkbox_{{ $cat->id }}"></th>
                                                            <th>{{ ++$counter }}</th>
                                                            <th>
                                                                <a href="{{ route('sub.show', $cat->id) }}">
                                                                    {{ $cat->name }}
                                                                </a>
                                                            </th>
                                                            <th class="text-center">
                                                                <button data-toggle="modal"
                                                                        data-target="#inlineForm_Price_{{ $cat->id }}"
                                                                        style="padding: 0.25vw;color:#fff!important"
                                                                        class="btn btn-primary show_prices_form"
                                                                        title="@lang('admin.view')">
                                                                    <i class="la la-money"></i>
                                                                </button>
                                                            </th>
                                                            @section('before_end')
                                                                @parent
                                                                <div class="modal fade text-left" id="inlineForm_Price_{{ $cat->id }}" tabindex="-1"
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
                                                                                                       style="padding: 0.75rem 1rem;">{{ getPriceByCountry($cat->checkup->id, $country->id) }} </label>
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
                                                            <th>{{ count($cat->services) }}</th>
                                                            <th class="text-center">
                                                                <a id="tr_{{$cat->id}}" href="#" class="verify_user"
                                                                   style="padding: 0.25vw;"
                                                                   data-url="{{route('active.category', $cat->id)}}"
                                                                   data-cancel="@lang('admin.cancel')"
                                                                   data-token="{{csrf_token()}}"
                                                                   @if ($cat->status == false)
                                                                   data-confirm-message="@lang("admin.verify_confirm|role:admin.the_category")"
                                                                   data-success-message="@lang("admin.verify_success|role:admin.the_category")"
                                                                   data-error-message="@lang("admin.verify_error|role:admin.the_category")"
                                                                   data-ok="@lang('admin.verify_user')"
                                                                   title="@lang('admin.verify_user')">
                                                                    <i class="ft-x-circle" style="color: red;"></i>
                                                                    @else
                                                                        data-confirm-message="@lang("admin.unverify_confirm|role:admin.the_category")"
                                                                        data-success-message="@lang("admin.unverify_success|role:admin.the_category")"
                                                                        data-error-message="@lang("admin.unverify_error|role:admin.the_category")"
                                                                        data-ok="@lang('admin.unverify_user')"
                                                                        title="@lang('admin.unverify_user')">
                                                                        <i class="ft-check-circle" style="color: green;"></i>
                                                                    @endif
                                                                </a>
                                                            </th>
                                                            <th style="border-right: 1px solid #E3EBF3">
                                                                <a href="{{route('sub.edit', $cat->id)}}"
                                                                   style="padding: 0.25vw;"
                                                                   title="@lang('admin.edit')" class="btn btn-success">
                                                                    <i class="ft-edit"></i>
                                                                </a>
                                                                <a href="{{route('sub.show', $cat->id)}}"
                                                                   style="padding: 0.25vw;"
                                                                   title="@lang('admin.view')" class="btn btn-info">
                                                                    <i class="ft-eye"></i>
                                                                </a>
                                                                <a id="tr_{{$cat->id}}" href="#"
                                                                   class="delete_record btn btn-danger"
                                                                   style="padding: 0.25vw;"
                                                                   data-url="{{route('categories.destroy', $cat->id)}}"
                                                                   data-confirm-message="@lang("admin.delete_confirm|role:admin.the_category")"
                                                                   data-success-message="@lang("admin.delete_success|role:admin.the_category")"
                                                                   data-error-message="@lang("admin.delete_error|role:admin.the_category")"
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
                                                data-page="/categories/"
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
