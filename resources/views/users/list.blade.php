@extends('layouts.app')

@section('title')  {{ __('admin.user_management') }} @endsection

@section('content-header')
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title">{{ __('admin.user_management') }}</h3>
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
            <a href="{{ route('users.create') }}">
                <button class="btn btn-info round box-shadow-2 px-2"
                        type="button"><i class="ft-edit icon-left"></i>@lang('admin.add_user')
                </button>
            </a>
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
                                    <th>@lang('admin.phone')</th>
                                    <th>@lang('admin.roles')</th>
                                    <th>@lang('admin.status')</th>
                                    <th>@lang('admin.settings')</th>
                                </tr>
                                </thead>
                                <tbody>
                                {? $counter = 0 ?}
                                @foreach($users as $user)
                                    <tr class="text-center" id="tr_{{ $user->id }}">
                                        <th><input type="checkbox" id="checkbox_{{ $user->id }}"></th>
                                        <th>{{ ++$counter }}</th>
                                        <th>
                                            <a href="{{ route('users.show', $user->id) }}">
                                                {{ $user->name }}
                                            </a>
                                        </th>
                                        <th>{{ $user->phone }}</th>
                                        <th>
                                            @if ($user->role === 'admin')
                                                @lang('admin.admin')
                                            @elseif ($user->role === 'super-admin')
                                                @lang('admin.super-admin')
                                            @else
                                                @lang('admin.manager')
                                            @endif
                                        </th>
                                        <th class="text-center">

                                            <a id="tr_{{$user->id}}" href="#" class="ban_user"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('ban.user', $user->id)}}"
                                               data-cancel="@lang('admin.cancel')"
                                               data-token="{{csrf_token()}}"
                                               @if ($user->ban == false)
                                               data-confirm-message="@lang("admin.ban_confirm|role:admin.the_user")"
                                               data-success-message="@lang("admin.ban_success|role:admin.the_user")"
                                               data-error-message="@lang("admin.ban_error|role:admin.the_user")"
                                               data-ok="@lang('admin.ban_user')"
                                               title="@lang('admin.ban_user')">
                                                <i class="ft-check-circle" style="color: green;"></i>
                                                @else
                                                    data-confirm-message="@lang("admin.unban_confirm|role:admin.the_user")"
                                                    data-success-message="@lang("admin.unban_success|role:admin.the_user")"
                                                    data-error-message="@lang("admin.unban_error|role:admin.the_user")"
                                                    data-ok="@lang('admin.unban_user')"
                                                    title="@lang('admin.unban_user')">
                                                    <i class="ft-x-circle" style="color: red;"></i>
                                                @endif
                                            </a>
                                            <a id="tr_{{$user->id}}" href="#" class="verify_user"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('verify.user', $user->id)}}"
                                               data-cancel="@lang('admin.cancel')"
                                               data-token="{{csrf_token()}}"
                                               @if ($user->verified == false)
                                               data-confirm-message="@lang("admin.verify_confirm|role:admin.the_user")"
                                               data-success-message="@lang("admin.verify_success|role:admin.the_user")"
                                               data-error-message="@lang("admin.verify_error|role:admin.the_user")"
                                               data-ok="@lang('admin.verify_user')"
                                               title="@lang('admin.verify_user')">
                                                <i class="ft-x-circle" style="color: red;"></i>
                                                @else
                                                    data-confirm-message="@lang("admin.unverify_confirm|role:admin.the_user")"
                                                    data-success-message="@lang("admin.unverify_success|role:admin.the_user")"
                                                    data-error-message="@lang("admin.unverify_error|role:admin.the_user")"
                                                    data-ok="@lang('admin.unverify_user')"
                                                    title="@lang('admin.unverify_user')">
                                                    <i class="ft-user-check" style="color: green;"></i>
                                                @endif
                                            </a>
                                        </th>
                                        <th style="border-right: 1px solid #E3EBF3">
                                            <a href="{{route('users.edit', $user->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.edit')" class="btn btn-success">
                                                <i class="ft-edit"></i>
                                            </a>
                                            <a href="{{route('users.show', $user->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.view')" class="btn btn-info">
                                                <i class="ft-eye"></i>
                                            </a>
                                            <a id="tr_{{$user->id}}" href="#" class="delete_record btn btn-danger"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('users.destroy', $user->id)}}"
                                               data-confirm-message="@lang("admin.delete_confirm|role:admin.the_user")"
                                               data-success-message="@lang("admin.delete_success|role:admin.the_user")"
                                               data-error-message="@lang("admin.delete_error|role:admin.the_user")"
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
                            data-page="/users/"
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
