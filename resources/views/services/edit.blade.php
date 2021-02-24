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
                            {{ __('admin.service_management')}}                        </a>
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
                <div class="card">
                    <div class="card-header" style="padding: 0;">
                        <div class="heading-elements">
                            <ul class="list-inline mb-0">
                                <li><a data-action="expand"><i class="ft-maximize"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-content collpase show">
                        <div class="card-body">
                            <form method="POST" action="{{ route('services.update', $service->id) }}"
                                  style="text-align: right;"
                                  enctype="multipart/form-data">
                                @csrf
                                {{method_field('PUT')}}
                                <div class="form-body">
                                    <h4 class="form-section"><i class="ft-settings"></i>
                                        @lang('admin.service_info')
                                    </h4>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.name_en')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-settings"></i></span>
                                                            </div>
                                                            <input type="text" id="pac-input" required
                                                                   autocomplete="name_en"
                                                                   class="form-control @error('name_en') is-invalid @enderror"
                                                                   value="@if(old('name_en')){{old('name_en')}}@else{{$service->name_en}}@endif"
                                                                   name="name_en">
                                                            @error('name_en')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.name_tr')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-settings"></i></span>
                                                            </div>
                                                            <input type="text" id="pac-input" required
                                                                   autocomplete="name_tr" dir="ltr"
                                                                   class="form-control @error('name_tr') is-invalid @enderror"
                                                                   value="@if(old('name_tr')){{old('name_tr')}}@else{{$service->name_tr}}@endif"
                                                                   name="name_tr">
                                                            @error('name_tr')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.name_ar')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-settings"></i></span>
                                                            </div>
                                                            <input type="text" id="pac-input" required
                                                                   autocomplete="name_ar"
                                                                   class="form-control @error('name_ar') is-invalid @enderror"
                                                                   value="@if(old('name_ar')){{old('name_ar')}}@else{{$service->name_ar}}@endif"
                                                                   name="name_ar">
                                                            @error('name_ar')
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
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.the_category')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-list"></i></span>
                                                            </div>
                                                            <select name="category" class="form-control">
                                                                @foreach($categories as $category)
                                                                    <option value="{{$category->id}}"
                                                                            @if ($category->id === $service->category->id)
                                                                            selected="selected"
                                                                        @endif>
                                                                        {{$category->name}}
                                                                    </option>
                                                                @endforeach
                                                            </select>
                                                            @error('verify')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control" for="name_ar"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.price')</label>
                                                <div class="col-md-9">
                                                    <fieldset id="parent_category">
                                                        <div class="input-group">
                                                            <button data-toggle="modal"
                                                                    data-target="#inlineForm_prices"
                                                                    style="padding: 0.25vw;color:#fff!important"
                                                                    class="form-control @error('price.*') is-invalid @enderror btn btn-primary show_prices_form"
                                                                    title="@lang('admin.add_prices')">
                                                                <i class="la la-money"></i>
                                                            </button>
                                                            @error('price.*')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>@lang('admin.must_fill_prices')</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.service_state')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-check-circle"></i></span>
                                                            </div>
                                                            <select name="status" class="form-control">
                                                                <option value="1" @if ($service->status == 1)
                                                                selected="selected"
                                                                    @endif>@lang('admin.verified')</option>
                                                                <option value="0" @if ($service->status == 0)
                                                                selected="selected"
                                                                    @endif>@lang('admin.un_verified')</option>
                                                            </select>
                                                            @error('verify')
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
                                <div class="modal fade text-left" id="inlineForm_prices" tabindex="-1"
                                     role="dialog" aria-labelledby="myModalLabel33" style="display: none;"
                                     aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <label class="modal-title text-text-bold-600" id="myModalLabel33">
                                                    @lang('admin.add_prices')
                                                </label>
                                                <button type="button" class="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="form-body">
                                                    <div class="row">
                                                        @foreach($countries as $country)
                                                            <div class="col-md-12">
                                                                <div class="form-group row">
                                                                    <label class="col-md-4 label-control" for="name"
                                                                           style="padding: 0.75rem 1rem;">{{ $country->name }} </label>
                                                                    <div class="col-md-6">
                                                                        <fieldset>
                                                                            <div class="input-group">
                                                                                <div class="input-group-prepend">
                                                                                    <span class="input-group-text" id="basic-addon3"><i
                                                                                            class="la la-money"></i></span>
                                                                                </div>
                                                                                <input id="price[{{$country->id}}]" type="number" min="0" step="0.01"
                                                                                       class="form-control @error("price.{{$country->id}}") is-invalid @enderror"
                                                                                       name="price[{{$country->id}}]"
                                                                                       value="@if (old('price.'.$country->id)){{ old('price.'.$country->id) }}@else{{ getPriceByCountry($service->id, $country->id) }}@endif"
                                                                                       autocomplete="price[{{$country->id}}]">
                                                                                @error('price.'.$country->id)
                                                                                <span class="invalid-feedback" role="alert">
                                                                                    <strong>{{ $message }}</strong></span>
                                                                                @enderror
                                                                            </div>
                                                                        </fieldset>
                                                                    </div>
                                                                    <label class="col-md-2 label-control" for="name"
                                                                           style="padding: 0.75rem 1rem;">{{ $country->currency }}</label>
                                                                </div>
                                                            </div>
                                                        @endforeach
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-actions">
                                    <div class="text-right">
                                        <input type="submit" class="btn btn-primary" value="@lang('admin.save')">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
