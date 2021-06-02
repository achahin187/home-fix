@extends('layouts.app')

@section('title') {{ __('admin.slider')}} @endsection

@section('content-header')
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title"> {{ __('admin.technical')}}</h3>
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
    <div class="content-header-right col-md-6 col-12">
        <div class="btn-group float-md-right" role="group" aria-label="Button group with nested dropdown">
            <a href="{{ route('technicals.create') }}">
                <button class="btn btn-info round box-shadow-2 px-2"
                        type="button"><i class="ft-edit icon-left"></i>@lang('admin.add')
                </button>
            </a>
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
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span>
                                                            <strong>@lang('admin.description')</strong>
                                                        </span> :
                                                        <p style="display: inline;">
                                                            {{$description->{App::getLocale().'_description'} }}
                                                        </p>
                                                        <hr>
                                                        <a href="{{route('technicals.edit', $description->id)}}"
                                                        style="padding: 0.25vw;"
                                                        title="@lang('admin.edit')" class="btn btn-success">
                                                            <i class="ft-edit"></i>
                                                        </a>
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
            </div>
        </div>

    </section>
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
                                    <th>@lang('admin.title')</th>
                                    <th>@lang('admin.text')</th>
                                    <th style="border-right: 1px solid #E3EBF3">@lang('admin.settings')</th>
                                </tr>
                                </thead>
                                <tbody>
                                {? $counter = 0 ?}
                                @foreach($technicals as $technical)
                                    <tr class="text-center" id="tr_{{ $technical->id }}">
                                        <th><input type="checkbox" id="checkbox_{{ $technical->id }}"></th>
                                        <th class="text-center">{{ ++$counter }}</th>
                                        <th>
                                            <a href="{{ route('technicals.show', $technical->id) }}">
                                            {{ $technical->{App::getLocale().'_title'} }}
                                            </a>
                                        </th>
                                        <th class="text-center">{{ $technical->{App::getLocale().'_section'} }}</th>

                                        <th style="border-right: 1px solid #E3EBF3">
                                            <a href="{{route('technicals.edit', $technical->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.edit')" class="btn btn-success">
                                                <i class="ft-edit"></i>
                                            </a>
                                            <a href="{{route('technicals.show', $technical->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.view')" class="btn btn-info">
                                                <i class="ft-eye"></i>
                                            </a>
                                            <a id="tr_{{$technical->id}}" href="#" class="delete_record btn btn-danger"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('technicals.destroy', $technical->id)}}"
                                               data-confirm-message="@lang("admin.delete_confirm|role:admin.the_offer")"
                                               data-success-message="@lang("admin.delete_success|role:admin.the_offer")"
                                               data-error-message="@lang("admin.delete_error|role:admin.the_offer")"
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
                            data-page="/technicals/"
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
