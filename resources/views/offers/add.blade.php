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
                        <a href="{{ route('offers.index') }}">
                            {{ $mainTitle }}
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
                            <form method="POST" action="{{ route('offers.store') }}" style="text-align: right;"
                                  enctype="multipart/form-data">
                                @csrf
                                <div class="form-body">
                                    <h4 class="form-section"><i class="la la-gift"></i>
                                        @lang('admin.offer_info')
                                    </h4>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.name_en')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-gift"></i></span>
                                                            </div>
                                                            <input id="name_en" type="text"
                                                                   class="form-control @error('name_en') is-invalid @enderror"
                                                                   name="name_en" value="{{ old('name_en') }}" required
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
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.name_tr')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-gift"></i></span>
                                                            </div>
                                                            <input id="name_tr" type="text" dir="ltr"
                                                                   class="form-control @error('name_tr') is-invalid @enderror"
                                                                   name="name_tr" value="{{ old('name_tr') }}" required
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
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.name_ar')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-gift"></i></span>
                                                            </div>
                                                            <input id="name_ar" type="text"
                                                                   class="form-control @error('name_ar') is-invalid @enderror"
                                                                   name="name_ar" value="{{ old('name_ar') }}" required
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
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.description_en')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-gift"></i></span>
                                                            </div>
                                                            <textarea id="description_en" type="text"
                                                                      class="form-control @error('description_en') is-invalid @enderror"
                                                                      name="description_en" required
                                                                      autocomplete="description_en">{{ old('description_en') }}</textarea>
                                                            @error('description_en')
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
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.description_tr')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-gift"></i></span>
                                                            </div>
                                                            <textarea id="description_tr" type="text" dir="ltr"
                                                                      class="form-control @error('description_tr') is-invalid @enderror"
                                                                      name="description_tr" required
                                                                      autocomplete="description_tr">{{ old('description_tr') }}</textarea>
                                                            @error('description_tr')
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
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.description_ar')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-gift"></i></span>
                                                            </div>
                                                            <textarea id="description_ar" type="text"
                                                                      class="form-control @error('description_ar') is-invalid @enderror"
                                                                      name="description_ar" required
                                                                      autocomplete="description_ar">{{ old('description_ar') }}</textarea>
                                                            @error('description_ar')
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
                                                <label class="col-md-1 label-control" for="name"
                                                       style="
                                                            padding: 0.75rem 1rem;
                                                            flex: 0 0 12.5%;
                                                            max-width: 12.5%;">
                                                    @lang('admin.the_category')</label>
                                                <div class="col-md-11" style="
                                                        flex: 0 0 calc(100% - 12.5%);
                                                        max-width: calc(100% - 12.5%);">
                                                    <fieldset id="parent_offer">
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-list"></i></span>
                                                            </div>
                                                            <select name="category"
                                                                    class="form-control">
                                                                @foreach($categories as $category)
                                                                    <option value="{{ $category->id }}">
                                                                        {{ $category->name }}
                                                                    </option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-1 label-control" for="name"
                                                       style="
                                                            padding: 0.75rem 1rem;
                                                            flex: 0 0 12.5%;
                                                            max-width: 12.5%;">
                                                    @lang('admin.choose_country')</label>
                                                <div class="col-md-11" style="
                                                        flex: 0 0 calc(100% - 12.5%);
                                                        max-width: calc(100% - 12.5%);">
                                                    <fieldset id="choose_country">
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-list"></i></span>
                                                            </div>
                                                            <select name="country_id"
                                                                    class="form-control">
                                                                @foreach($countries as $country)
                                                                    <option value="{{ $country->id }}">
                                                                        {{ $country->name }}
                                                                    </option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.price')</label>
                                                <div class="col-md-6">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-money"></i></span>
                                                            </div>
                                                            <input type="number" step="0.01"
                                                                   class="form-control @error('price') is-invalid @enderror"
                                                                   name="price" value="{{ old('price') }}">
                                                            @error('price')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                <label class="col-md-3 label-control" for="price"
                                                       style="padding: 0.75rem 0;">
                                                    </label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.image')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-money"></i></span>
                                                            </div>
                                                            <input type="file" name="image" value="{{ old('image') }}"
                                                                   class="form-control @error('image') is-invalid @enderror">
                                                            @error('image')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group row">
                                                <label class="col-md-2 label-control" for="name"
                                                       style="
                                                            padding: 0.75rem 1rem;
                                                            flex: 0 0 12.5%;
                                                            max-width: 12.5%;">
                                                    @lang('admin.end_at')</label>
                                                <div class="col-md-5">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-calendar"></i></span>
                                                            </div>
                                                            <input type="date" name="end_at_date"
                                                                   class="form-control
                                                                        @error('end_at_date') is-invalid @enderror"
                                                                   placeholder="@lang('admin.pick-a-date')"
                                                                   value="{{ old('end_at_date') }}">
                                                            @error('end_at_date')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                <div class="col-md-5">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-clock"></i></span>
                                                            </div>
                                                            <input type="time" name="end_at_time"
                                                                   class="form-control
                                                                    @error('end_at_time') is-invalid @enderror"
                                                                   placeholder="@lang('admin.pick-a-time')"
                                                                   value="{{ old('end_at_time') }}">
                                                            @error('end_at_time')
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
                                        <button type="submit" class="btn btn-primary">@lang('admin.save')
                                            <i class="ft-thumbs-up position-right"></i></button>
                                        <button type="reset" class="btn btn-warning">@lang('admin.delete')
                                            <i class="ft-refresh-cw position-right"></i></button>
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
