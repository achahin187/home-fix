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
                        <a href="{{ route('partners.index') }}">
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
                            <form method="POST" action="{{ route('partners.store') }}" style="text-align: right;"
                                  enctype="multipart/form-data">
                                @csrf
                                <div class="form-body">
                                    <h4 class="form-section"><i class="la la-gift"></i>
                                       {{ __('admin.Add a new partner') }} 
                                    </h4>
                                    <div class="row">
                                        <div class="col-md-12">
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
                                                                   <div class="alert alert-info text-center"> {{ __('admin.image must be 720 * 73') }}  </div>
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
