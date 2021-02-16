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
                            <form method="POST" action="{{ route('slider.update', $slider->id) }}"
                                  style="text-align: right;"
                                  enctype="multipart/form-data">
                                @csrf
                                {{method_field('PUT')}}
                                <div class="form-body">
                                    <h4 class="form-section"><i class="la la-gift"></i>
                                        @lang('admin.offer_info')
                                    </h4>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-2 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.title_en')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-gift"></i></span>
                                                            </div>
                                                            <input id="title_en" type="text"
                                                                   class="form-control @error('title_en') is-invalid @enderror"
                                                                   name="title_en" autocomplete="title_en" required
                                                                   value="@if(old('title_en')){{old('title_en')}}@else{{$slider->title_en}}@endif">
                                                            @error('title_en')
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
                                                <label class="col-md-2 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.title_tr')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-gift"></i></span>
                                                            </div>
                                                            <input id="title_tr" type="text" dir="ltr"
                                                                   class="form-control @error('title_tr') is-invalid @enderror"
                                                                   name="title_tr" autocomplete="title_tr" required
                                                                   value="@if(old('title_tr')){{old('title_tr')}}@else{{$slider->title_tr}}@endif">
                                                            @error('title_tr')
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
                                                <label class="col-md-2 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.title_ar')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-gift"></i></span>
                                                            </div>
                                                            <input id="title_ar" type="text"
                                                                   class="form-control @error('title_ar') is-invalid @enderror"
                                                                   name="title_ar" autocomplete="title_ar" required
                                                                   value="@if(old('title_ar')){{old('title_ar')}}@else{{$slider->title_ar}}@endif">
                                                            @error('title_ar')
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
                                                <label class="col-md-2 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.text_en')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-gift"></i></span>
                                                            </div>
                                                            <textarea id="text_en" type="text"
                                                                      class="form-control @error('text_en') is-invalid @enderror"
                                                                      name="text_en" required
                                                                      autocomplete="description_en"
                                                            >@if(old('text_en')){{old('text_en')}}@else{{$slider->text_en}}@endif</textarea>
                                                            @error('text_en')
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
                                                <label class="col-md-2 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.text_tr')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-gift"></i></span>
                                                            </div>
                                                            <textarea id="text_tr" type="text" dir="ltr"
                                                                      class="form-control @error('text_tr') is-invalid @enderror"
                                                                      name="text_tr" required
                                                                      autocomplete="text_tr"
                                                            >@if(old('text_tr')){{old('text_tr')}}@else{{$slider->text_tr}}@endif</textarea>
                                                            @error('text_tr')
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
                                                <label class="col-md-2 label-control" for="name"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.text_ar')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-gift"></i></span>
                                                            </div>
                                                            <textarea id="text_ar" type="text"
                                                                      class="form-control @error('text_ar') is-invalid @enderror"
                                                                      name="text_ar"
                                                                      autocomplete="text_ar" required
                                                            >@if(old('text_ar')){{old('text_ar')}}@else{{$slider->text_ar}}@endif</textarea>
                                                            @error('text_ar')
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
                                                <label class="col-md-2 label-control" for="name"
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

                                    </div>
                                </div>
                                <div class="form-actions">
                                    <div class="text-right">
                                        <button type="submit" class="btn btn-primary">@lang('admin.save')
                                            <i class="ft-thumbs-up position-right"></i></button>
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
