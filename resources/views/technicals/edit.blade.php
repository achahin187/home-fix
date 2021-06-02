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
                        <a href="{{ route('technicals.index') }}">
                            {{ __('admin.technical')}}
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
                            <form method="POST" action="{{ route('technicals.update', $technical->id) }}"
                                  style="text-align: right;"
                                  enctype="multipart/form-data">
                                @csrf
                                {{method_field('PUT')}}
                                <div class="form-body">
                                    <h4 class="form-section"><i class="la la-gift"></i>
                                        @lang('admin.technicals_info')
                                    </h4>
                                    @if($technical->type == 1)
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
                                                                <input id="en_title" type="text"
                                                                    class="form-control @error('en_title') is-invalid @enderror"
                                                                    name="en_title" autocomplete="en_title" required
                                                                    value="@if(old('en_title')){{old('en_title')}}@else{{$technical->en_title}}@endif">
                                                                @error('en_title')
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
                                                                <input id="tr_title" type="text" dir="ltr"
                                                                    class="form-control @error('tr_title') is-invalid @enderror"
                                                                    name="tr_title" autocomplete="tr_title" required
                                                                    value="@if(old('tr_title')){{old('tr_title')}}@else{{$technical->tr_title}}@endif">
                                                                @error('tr_title')
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
                                                                <input id="ar_title" type="text"
                                                                    class="form-control @error('ar_title') is-invalid @enderror"
                                                                    name="ar_title" autocomplete="ar_title" required
                                                                    value="@if(old('ar_title')){{old('ar_title')}}@else{{$technical->ar_title}}@endif">
                                                                @error('ar_title')
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
                                                                <textarea id="en_section" type="text"
                                                                        class="form-control @error('en_section') is-invalid @enderror"
                                                                        name="en_section" required
                                                                        autocomplete="en_section"
                                                                >@if(old('en_section')){{old('en_section')}}@else{{$technical->en_section}}@endif</textarea>
                                                                @error('en_section')
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
                                                                <textarea id="tr_section" type="text" dir="ltr"
                                                                        class="form-control @error('tr_section') is-invalid @enderror"
                                                                        name="tr_section" required
                                                                        autocomplete="tr_section"
                                                                >@if(old('tr_section')){{old('tr_section')}}@else{{$technical->tr_section}}@endif</textarea>
                                                                @error('tr_section')
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
                                                                <textarea id="ar_section" type="text"
                                                                        class="form-control @error('ar_section') is-invalid @enderror"
                                                                        name="ar_section"
                                                                        autocomplete="ar_section" required
                                                                >@if(old('ar_section')){{old('ar_section')}}@else{{$technical->ar_section}}@endif</textarea>
                                                                @error('ar_section')
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
                                    @else
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
                                                                <textarea id="en_description" type="text"
                                                                        class="form-control @error('en_description') is-invalid @enderror"
                                                                        name="en_description" required
                                                                        autocomplete="en_description"
                                                                >@if(old('en_description')){{old('en_description')}}@else{{$technical->en_description}}@endif</textarea>
                                                                @error('en_description')
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
                                                                <textarea id="tr_description" type="text" dir="ltr"
                                                                        class="form-control @error('tr_description') is-invalid @enderror"
                                                                        name="tr_description" required
                                                                        autocomplete="tr_description"
                                                                >@if(old('tr_description')){{old('tr_description')}}@else{{$technical->tr_description}}@endif</textarea>
                                                                @error('tr_description')
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
                                                                <textarea id="ar_description" type="text"
                                                                        class="form-control @error('ar_description') is-invalid @enderror"
                                                                        name="ar_description"
                                                                        autocomplete="ar_description" required
                                                                >@if(old('ar_description')){{old('ar_description')}}@else{{$technical->ar_description}}@endif</textarea>
                                                                @error('ar_description')
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
                                    @endif

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
