@extends('layouts.app')

@section('title') {{ __('admin.contactus') }} @endsection

@section('content-header')
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title">{{ __('admin.contactus') }}</h3>
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
                            {{ __('admin.contactus') }}
                        </a>
                    </li>
                </ol>
            </div>
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
                                    <th>@lang('admin.Email')</th>
                                    <th>@lang('admin.Information')</th>
                                    <th>@lang('admin.Your Message')</th>
                                    <th style="border-right: 1px solid #E3EBF3">@lang('admin.settings')</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($contacts as $contact)
                                    <tr class="text-center" id="tr_{{ $contact->id }}">
                                        <th><input type="checkbox" id="checkbox_"></th>   
                                        
                                        <th class="text-center">{{ ++$counter }}</th>
                                        <th class="text-center">
                                                {{$contact->User_Name}}
                                        </th>
                                        <th class="text-center">{{ $contact->Email }}</th>
                                        <th class="text-center">{{ $contact->Information }}</th>

                                        <th class="text-center">{{ $contact->Message }}</th>
                                        <th style="border-right: 1px solid #E3EBF3">
                                            <a href="#"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.view')" class="btn btn-info">
                                                <i class="ft-eye"></i>
                                            </a>
                                            <a id="tr_{{$contact->id}}" href="#" class="delete_record btn btn-danger"
                                               style="padding: 0.25vw;"
                                               data-url="#"
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
