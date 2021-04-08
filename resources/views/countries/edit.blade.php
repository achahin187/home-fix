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
                        <a href="{{ route('countries.index') }}">
                            {{ __('admin.country_management') }}
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
                            <form novalidate method="POST" action="{{ route('countries.update', $country->id) }}"
                                  style="text-align: right;"
                                  enctype="multipart/form-data">
                                @csrf
                                {{method_field('PUT')}}
                                <div class="form-body">
                                    <h4 class="form-section"><i class="ft-map"></i>
                                        @lang('admin.country_info')
                                    </h4>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.name_en')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-map"></i></span>
                                                            </div>
                                                            <input id="name" type="text"
                                                                   class="form-control @error('name_en') is-invalid @enderror"
                                                                   name="name_en" value="@if (old('name_en')){{ old('name_en') }}@else{{ $country->name_en }}@endif" required
                                                                   autocomplete="name_en">
                                                            @error('name_en')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.name_tr')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-map"></i></span>
                                                            </div>
                                                            <input id="name" type="text"
                                                                   class="form-control @error('name_tr') is-invalid @enderror"
                                                                   name="name_ar" value="@if (old('name_tr')){{ old('name_tr') }}@else{{ $country->name_tr }}@endif" required
                                                                   autocomplete="name_tr">
                                                            @error('name_tr')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.name_ar')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-map"></i></span>
                                                            </div>
                                                            <input id="name" type="text"
                                                                   class="form-control @error('name_ar') is-invalid @enderror"
                                                                   name="name_ar" value="@if (old('name_ar')){{ old('name_ar') }}@else{{ $country->name_ar }}@endif" required
                                                                   autocomplete="name_ar">
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
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.currency_en')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-money"></i></span>
                                                            </div>
                                                            <input id="currency" type="text"
                                                                   class="form-control @error('currency_en') is-invalid @enderror"
                                                                   name="currency_en" value="@if (old('currency_en')){{ old('currency_en') }}@else{{ $country->currency_en }}@endif" required
                                                                   autocomplete="currency_en">
                                                            @error('currency_en')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.currency_tr')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-money"></i></span>
                                                            </div>
                                                            <input id="currency" type="text"
                                                                   class="form-control @error('currency_tr') is-invalid @enderror"
                                                                   name="currency_tr" value="@if (old('currency_tr')){{ old('currency_tr') }}@else{{ $country->currency_tr }}@endif" required
                                                                   autocomplete="currency_tr">
                                                            @error('currency_tr')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.currency_ar')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-money"></i></span>
                                                            </div>
                                                            <input id="currency" type="text"
                                                                   class="form-control @error('currency_ar') is-invalid @enderror"
                                                                   name="currency_ar" value="@if (old('currency_ar')){{ old('currency_ar') }}@else{{ $country->currency_ar }}@endif" required
                                                                   autocomplete="currency_ar">
                                                            @error('currency_ar')
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
                                                <label class="col-md-3 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.max_length')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i class="fas fa-ruler-horizontal"></i></span>
                                                            </div>
                                                            <input id="max_length" type="text"
                                                                   class="form-control @error('max_length') is-invalid @enderror"
                                                                   name="max_length" value="@if (old('max_length')){{ old('max_length') }}@else{{ $country->max_length }}@endif" required
                                                                   autocomplete="max_length">
                                                            @error('max_length')
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
