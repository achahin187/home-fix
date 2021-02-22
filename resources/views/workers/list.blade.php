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
                        <a href="{{ route('workers.index') }}">
                            {{ $mainTitle }}
                        </a>
                    </li>
                </ol>
            </div>
        </div>
    </div>
    <div class="content-header-right col-md-6 col-12">
        <div class="btn-group float-md-right" role="group" aria-label="Button group with nested dropdown">
            <a href="{{ route('workers.create') }}">
                <button class="btn btn-info round box-shadow-2 px-2"
                        type="button"><i class="ft-edit icon-left"></i>@lang('admin.add_worker')
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
                                    <th>@lang('admin.the_country')</th>
                                    <th>@lang('admin.reviews')</th>
                                    <th>@lang('admin.order_count')</th>
                                    <th>@lang('admin.the_category')</th>
                                    <th>@lang('admin.status')</th>
                                    <th>@lang('admin.settings')</th>
                                </tr>
                                </thead>
                                <tbody>
                                {? $counter = 0 ?}
                                @foreach($workers as $worker)
                                    <tr class="text-center" id="tr_{{ $worker->id }}"
                                        @if (changeUnverifiedWorkerColor($worker->id))
                                            style="background:#ffebee;background:#ffebeecc"
                                        @endif>
                                        <th><input type="checkbox" id="checkbox_{{ $worker->id }}"></th>
                                        <th>{{ ++$counter }}</th>
                                        <th>
                                            <a href="{{ route('workers.show', $worker->id) }}">
                                                {{ $worker->name }}
                                            </a>
                                        </th>
                                        <th>{{ $worker->phone }}</th>
                                        <th>{{ $worker->user_address['country'] }}</th>
                                        <th class="text-center">
                                            <span id="review-stars_{{$worker->id}}"
                                                  title="@lang('admin.the_review')">
                                            </span>
                                            @section('before_end')
                                                @parent
                                                <script>
                                                    $('#review-stars_{{$worker->id}}').raty({
                                                        readOnly: true,
                                                        score: '{{round($worker->review, 2)}}',
                                                        starHalf: '{{asset("images/raty/star-half.png")}}',
                                                        starOff: '{{asset("images/raty/star-off.png")}}',
                                                        starOn: '{{asset("images/raty/star-on.png")}}',
                                                        hints: [
                                                            "@lang('admin.the_review'): " + "{{ round($worker->review, 2) }}",
                                                            "@lang('admin.the_review'): " + "{{ round($worker->review, 2) }}",
                                                            "@lang('admin.the_review'): " + "{{ round($worker->review, 2) }}",
                                                            "@lang('admin.the_review'): " + "{{ round($worker->review, 2) }}",
                                                            "@lang('admin.the_review'): " + "{{ round($worker->review, 2) }}",
                                                        ],
                                                        half: true
                                                    });
                                                </script>
                                            @endsection
                                        </th>
                                        <th>
                                            <a href="{{ route('users.orders', $worker->id) }}">{{ count($worker->workerOrders) }}</a>
                                        </th>
                                        <th>{!! $categories[$worker->id] !!}</th>
                                        <th class="text-center">
                                            <a id="tr_{{$worker->id}}" href="#" class="ban_user"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('ban.user', $worker->id)}}"
                                               data-cancel="@lang('admin.cancel')"
                                               data-token="{{csrf_token()}}"
                                               @if ($worker->ban == false)
                                               data-confirm-message="@lang("admin.ban_confirm|role:admin.the_worker")"
                                               data-success-message="@lang("admin.ban_success|role:admin.the_worker")"
                                               data-error-message="@lang("admin.ban_error|role:admin.the_worker")"
                                               data-ok="@lang('admin.ban_user')"
                                               title="@lang('admin.ban_user')">
                                                <i class="ft-check-circle" style="color:green"></i>
                                                @else
                                                    data-confirm-message="@lang("admin.unban_confirm|role:admin.the_worker")"
                                                    data-success-message="@lang("admin.unban_success|role:admin.the_worker")"
                                                    data-error-message="@lang("admin.unban_error|role:admin.the_worker")"
                                                    data-ok="@lang('admin.unban_user')"
                                                    title="@lang('admin.unban_user')">
                                                    <i class="ft-x-circle" style="color:red"></i>
                                                @endif
                                            </a>
                                            <a id="tr_{{$worker->id}}" href="#" class="verify_user"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('verify.user', $worker->id)}}"
                                               data-cancel="@lang('admin.cancel')"
                                               data-token="{{csrf_token()}}"
                                               @if($worker->verified == false)
                                               data-confirm-message="@lang("admin.verify_confirm|role:admin.the_worker")"
                                               data-success-message="@lang("admin.verify_success|role:admin.the_worker")"
                                               data-error-message="@lang("admin.verify_error|role:admin.the_worker")"
                                               data-ok="@lang('admin.verify_user')"
                                               title="@lang('admin.verify_user')">
                                                <i class="ft-x-circle" style="color:red"></i>
                                                @else
                                                    data-confirm-message="@lang("admin.unverify_confirm|role:admin.the_worker")"
                                                    data-success-message="@lang("admin.unverify_success|role:admin.the_worker")"
                                                    data-error-message="@lang("admin.unverify_error|role:admin.the_worker")"
                                                    data-ok="@lang('admin.unverify_user')"
                                                    title="@lang('admin.unverify_user')">
                                                    <i class="ft-user-check" style="color:green"></i>
                                                @endif
                                            </a>
                                             
                                            <a id="tr_{{$worker->id}}" href="#" class="sendMessage"
                                                style="padding: 0.25vw;"
                                                data-url="{{route('sendMessage', $worker->id)}}"
                                                data-cancel="@lang('admin.cancel')"
                                                data-token="{{csrf_token()}}"
                                                @if ($worker->verified == false)
                                                data-confirm-message="@lang("admin.verify_confirm|role:admin.the_worker")"
                                                data-success-message="@lang("admin.verify_success|role:admin.the_worker")"
                                                data-error-message="@lang("admin.verify_error|role:admin.the_worker")"
                                                data-ok="@lang('admin.send activation_key')"
                                                title="@lang('admin.send activation_key')">
                                                <i class="far fa-paper-plane" style="color:red"></i>
                                                @else
                                                data-confirm-message="@lang("admin.verify_confirm|role:admin.the_worker")"
                                                data-success-message="@lang("admin.verify_success|role:admin.the_worker")"
                                                data-error-message="@lang("admin.verify_error|role:admin.the_worker")"
                                                data-ok="@lang('admin.send activation_key')"
                                                title="@lang('admin.send activation_key')">
                                                <i class="far fa-paper-plane" style="color:green"></i>
                                                @endif
                                          
                                             </a>
                                        </th>
                                        <th style="border-right: 1px solid #E3EBF3">
                                            <a href="{{route('workers.edit', $worker->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.edit')" class="btn btn-success">
                                                <i class="ft-edit"></i>
                                            </a>
                                            <a href="{{route('workers.show', $worker->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.view')" class="btn btn-info">
                                                <i class="ft-eye"></i>
                                            </a>
                                            <a id="tr_{{$worker->id}}" href="#" class="delete_record btn btn-danger"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('workers.destroy', $worker->id)}}"
                                               data-confirm-message="@lang("admin.delete_confirm|role:admin.the_worker")"
                                               data-success-message="@lang("admin.delete_success|role:admin.the_worker")"
                                               data-error-message="@lang("admin.delete_error|role:admin.the_worker")"
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
                            data-page="/workers/"
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
