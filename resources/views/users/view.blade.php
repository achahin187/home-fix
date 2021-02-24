@extends('layouts.app')

@section('title') {{ $title }} @endsection

@section('content-header')
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title">
            {{ $title }}
            <bdi>
                @if ($user->verified == 1)
                    <i title="@lang('admin.verified')" class="ft-user-check" style="color:green"></i>
                @else
                    <i title="@lang('admin.un_verified')" class="ft-x-circle" style="color:red"></i>
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
                        <a href="{{ route('users.index') }}">
                            {{ __('admin.user_management') }}         
                        
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
                <a class="dropdown-item" href="{{route('users.edit', $user->id)}}">
                    <i class="ft-edit icon-right"></i>@lang('admin.edit')
                </a>
                <a id="tr_{{$user->id}}" href="#" class="delete_record dropdown-item"
                   data-url="{{route('users.destroy', $user->id)}}"
                   data-confirm-message="@lang("admin.delete_confirm|role:admin.the_user")"
                   data-success-message="@lang("admin.delete_success|role:admin.the_user")"
                   data-error-message="@lang("admin.delete_error|role:admin.the_user")"
                   data-ok="@lang('admin.delete')"
                   data-cancel="@lang('admin.cancel')"
                   data-token="{{csrf_token()}}"
                   data-redirect="{{route('users.index')}}">
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
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.email')</strong></span> :
                                                        <p style="display: inline;">{{$user->email}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.phone')</strong></span> :
                                                        <p style="display: inline;">{{$user->phone}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.address')</strong></span> :
                                                        <p style="display: inline;">{{$user->address}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.roles')</strong></span> :
                                                        <p style="display: inline;">
                                                            @if ($user->role === 'admin')
                                                                @lang('admin.admin')
                                                            @elseif ($user->role === 'super-admin')
                                                                @lang('admin.super-admin')
                                                            @else
                                                                @lang('admin.manager')
                                                            @endif
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.notes')</strong></span> :
                                                        <p style="display: inline;">
                                                            {{ $user->notes }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3 pull-right">
                                    <div class="card border-blue border-lighten-2">
                                        <div class="text-center">
                                            <div class="card-body" style="padding: .5vw;">
                                                <img src="{{config('app.url')}}/{{$user->avatar}}"
                                                     class="rounded-circle width-100-per height-150"
                                                     alt="User image">
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
