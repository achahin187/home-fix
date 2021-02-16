@extends('layouts.app')

@section('title') {{ $title }} @endsection

@section('content-header')
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title">
            {{ $title }}
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
                        <a href="{{ route('complains.index') }}">
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
                <a id="tr_{{$complain->id}}" href="#" class="delete_record dropdown-item"
                   data-url="{{route('complains.destroy', $complain->id)}}"
                   data-confirm-message="@lang("admin.complain_delete_confirm")"
                   data-success-message="@lang("admin.delete_success|role:admin.the_complain")"
                   data-error-message="@lang("admin.delete_error|role:admin.the_complain")"
                   data-ok="@lang('admin.delete')"
                   data-cancel="@lang('admin.cancel')"
                   data-token="{{csrf_token()}}"
                   data-redirect="{{route('complains.index')}}">
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
                <div class="card-content">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                    <div class="card-content">
                                        <div class="card-body">
                                            <span><strong>@lang('admin.subject')</strong></span> :
                                            <p style="display: inline;">{{$complain->subject}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                    <div class="card-content">
                                        <div class="card-body">
                                            <span><strong>@lang('admin.author')</strong></span> :
                                            <p style="display: inline;">{{$complain->author['name']}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                    <div class="card-content">
                                        <div class="card-body">
                                            <span><strong>@lang('admin.content')</strong></span> :
                                            <p style="display: inline;">{{$complain->content}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <button id="tr_{{$complain->id}}"
                        class="verify_user btn btn-info"
                        style="color: #fff!important;padding: 1% 5%"
                        data-url="{{route('verify.complain', $complain->id)}}"
                        data-cancel="@lang('admin.cancel')"
                        data-token="{{csrf_token()}}"
                        @if ($complain->active == true)
                        data-confirm-message="@lang("admin.complain_status_confirm")"
                        data-success-message="@lang("admin.complain_status_changed")"
                        data-error-message="@lang("admin.complain_status_error")"
                        data-ok="@lang('admin.complain_make_as_read')">
                    @lang('admin.complain_make_as_read')
                    @else
                        data-confirm-message="@lang("admin.complain_status_confirm")"
                        data-success-message="@lang("admin.complain_status_changed")"
                        data-error-message="@lang("admin.complain_status_error")"
                        data-ok="@lang('admin.complain_make_unread')">
                        @lang('admin.complain_make_unread')
                    @endif
                </button>
            </div>
        </div>
    </section>
@endsection
