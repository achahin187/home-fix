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
                        <a href="{{ route('orders.index') }}">
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
                <button data-toggle="modal" data-target="#inlineForm_{{$order->id}}"
                        class="dropdown-item">
                    <i class="ft-edit icon-right"></i>@lang('admin.edit')
                </button>
                <a id="tr_{{$order->id}}" href="#" class="delete_record dropdown-item"
                   data-url="{{route('orders.destroy', $order->id)}}"
                   data-confirm-message="@lang("admin.delete_confirm|role:admin.the_order")"
                   data-success-message="@lang("admin.delete_success|role:admin.the_order")"
                   data-error-message="@lang("admin.delete_error|role:admin.the_order")"
                   data-ok="@lang('admin.delete')"
                   data-cancel="@lang('admin.cancel')"
                   data-redirect="{{ route('orders.index') }}"
                   data-token="{{csrf_token()}}">
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
                    <div class="card pull-up">
                        <div class="card-header">
                        </div>
                        <div class="card-content">
                            <div class="card-body pt-0">
                                <div class="row">
                                    <div class="col-sm-3 border-right-blue-grey border-right-lighten-5 text-center">
                                        <h5 class="danger text-bold-600">@lang('admin.the_client')</h5>
                                        <h6 class="font-large-2 text-bold-400">
                                            <a class="data_to_fit"
                                               href="@if ($order->client['id']){{ route('clients.show', $order->client['id']) }}@endif">
                                                {{ $order->client['name'] }}
                                            </a>
                                        </h6>
                                    </div>
                                    <div class="col-sm-3 text-center">
                                        <h5 class="success text-bold-600">@lang('admin.the_worker')</h5>
                                        <h6 class="font-large-2 text-bold-400">
                                            <a class="data_to_fit"
                                               href="@if ($order->worker['id']){{ route('workers.show', $order->worker['id']) }}@endif">
                                                {{ $order->worker['name'] }}
                                            </a>
                                        </h6>
                                    </div>
                                    <div class="col-sm-3 text-center border-right-blue-grey border-right-lighten-5">
                                        <h5 class="warning text-bold-600">@lang('admin.total_price')</h5>
                                        <h6 class="font-large-2 text-bold-400 data_to_fit">
                                            {{$order->total_price}} {{ $order->currency }} </h6>
                                    </div>
                                    <div class="col-sm-3 text-center border-right-blue-grey border-right-lighten-5">
                                        <h5 class="warning text-bold-600">@lang('admin.the_category')</h5>
                                        <h6 class="font-large-2 text-bold-400 data_to_fit">
                                            {{ $category }}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.issue')</strong></span> :
                                                        <p style="display: inline;">{{$order->issue}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.client_address')</strong></span> :
                                                        <p style="display: inline;">{{$order->address}}</p>
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
                                                        <span><strong>@lang('admin.day')</strong></span> :
                                                        <p style="display: inline;">{{$order->day}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.time')</strong></span> :
                                                        <p style="display: inline;">{{ $order->time }}</p>
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
                                                        <span><strong>@lang('admin.order_status')</strong></span> :
                                                        <p style="display: inline;">{{$order->status_name}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.payment_method')</strong></span> :
                                                        <p style="display: inline;">
                                                            @if ($order->cod == true)
                                                                @lang('admin.cash_on_delivery')
                                                            @else
                                                                @lang('admin.online_payment')
                                                            @endif
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    @if ($order->attachment !== '')
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                    <div class="card-content">
                                                        <div class="card-body">
                                                            <span><strong>@lang('admin.image')</strong></span>
                                                            <img style="width: 100%;" src="/{{$order->attach_path}}" alt="">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    @endif
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <iframe style="width: 100%; height: 25vw;"
                                            src="https://www.google.com/maps?q={{$order->latitude}},{{$order->longitude}}&t=k&z=10&output=embed"
                                            frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                                    </iframe>
                                    <br/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-content collapse show">
                                            <div class="card-body card-dashboard">
                                                <div class="card-title text-center font-medium-5 font-weight-bolder">
                                                    @lang('admin.services')
                                                </div>
                                                <table style="width:100%"
                                                       class="table table-striped table-bordered file-export table-responsive-1y1">
                                                    <thead>
                                                    <tr class="text-center">
                                                        <th>#</th>
                                                        <th>@lang('admin.the_service')</th>
                                                        <th>@lang('admin.quantity')</th>
                                                        <th>@lang('admin.price')</th>
                                                        <th>@lang('admin.status')</th>
                                                        <th>@lang('admin.settings')</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {? $counter = 0 ?}
                                                    <tr class="text-center">
                                                        <th colspan="6">@lang('admin.client_orders')</th>
                                                    </tr>
                                                    @foreach($order->services as $service)
                                                        <tr class="text-center" id="tr_{{ $service->id }}">
                                                            <th>{{ ++$counter }}</th>
                                                            <th>
                                                                <a href="{{ route('services.show', $service->id) }}">
                                                                    {{ $service->name }}
                                                                </a>
                                                            </th>
                                                            <th>
                                                                {{ $service->quantity }}
                                                            </th>
                                                            <th>
                                                                {{ $service->price }}
                                                            </th>
                                                            <th>
                                                                <i class="ft-check-circle"
                                                                   title="@lang('admin.accepted')"
                                                                   style="color:green"></i>
                                                            <th style="border-right: 1px solid #E3EBF3">
                                                                <a id="tr_{{$service->id}}" href="#" class="delete_record btn btn-danger"
                                                                   style="padding: 0.25vw;"
                                                                   data-url="{{ route('order_service.destroy', [
                                                                                                                   'order'   => $order->id,
                                                                                                                   'service' => $service->id,
                                                                                                                ]) }}"
                                                                   data-confirm-message="@lang("admin.delete_confirm|role:admin.the_service")"
                                                                   data-success-message="@lang("admin.delete_success|role:admin.the_service")"
                                                                   data-error-message="@lang("admin.delete_error|role:admin.the_service")"
                                                                   data-ok="@lang('admin.delete')"
                                                                   data-cancel="@lang('admin.cancel')"
                                                                   data-token="{{csrf_token()}}"
                                                                   title="@lang('admin.delete')">
                                                                    <i class="ft-trash-2"></i>
                                                                </a>
                                                            </th>
                                                        </tr>
                                                    @endforeach
                                                    <tr class="text-center">
                                                        <th colspan="6">@lang('admin.worker_orders')</th>
                                                    </tr>
                                                    @foreach($order->notes as $service)
                                                        <tr id="tr_{{ $service->id }}" class="text-center">
                                                            <th>{{ ++$counter }}</th>
                                                            <th>
                                                                {{ $service->service }}
                                                            </th>
                                                            <th>
                                                                {{ $service->quantity }}
                                                            </th>
                                                            <th class="text-center">
                                                                {{ $service->price }}
                                                            </th>
                                                            <th class="text-center">
                                                                @if ($service->status == 1)
                                                                    <i class="ft-check-circle"
                                                                       title="@lang('admin.accepted')"
                                                                       style="color:green"></i>
                                                                @else
                                                                    <i class="ft-x-circle"
                                                                       title="@lang('admin.un_accepted')"
                                                                       style="color:red"></i>
                                                                @endif
                                                            </th>
                                                            <th style="border-right: 1px solid #E3EBF3">
                                                                <a id="tr_{{$service->id}}" href="#" class="delete_record btn btn-danger"
                                                                   style="padding: 0.25vw;"
                                                                   data-url="{{ route('note.destroy', $service->id) }}"
                                                                   data-confirm-message="@lang("admin.delete_confirm|role:admin.the_service")"
                                                                   data-success-message="@lang("admin.delete_success|role:admin.the_service")"
                                                                   data-error-message="@lang("admin.delete_error|role:admin.the_service")"
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-content collapse show">
                                            <div class="card-body card-dashboard">
                                                <div class="card-title text-center font-medium-5 font-weight-bolder">
                                                    @lang('admin.order_tracking')
                                                </div>
                                                <table style="width:100%"
                                                       class="table table-striped table-bordered file-export table-responsive-1y1">
                                                    <thead>
                                                    <tr class="text-center">
                                                        <th>#</th>
                                                        <th>@lang('admin.status')</th>
                                                        <th>@lang('admin.date')</th>
                                                        <th>@lang('admin.notes')</th>
                                                        <th>@lang('admin.by')</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {? $counter = 0 ?}
                                                    @foreach($order->tracking as $track)
                                                        <tr class="text-center">
                                                            <th>{{ ++$counter }}</th>
                                                            <th>{{ $track->status_name }}</th>
                                                            <th class="text-center"
                                                                @if (app()->getLocale() === 'ar')
                                                                style="direction: ltr;">
                                                                {{ date('d/m/Y h:i A', strtotime($track->created_at)) }}
                                                                @else
                                                                    style="direction: rtl;">
                                                                    {{ date('d/m/Y h:i A', strtotime($track->created_at)) }}
                                                                @endif
                                                            </th>
                                                            <th>{{ $track->note }}</th>
                                                            <th>
                                                                @if (!empty($track->user))
                                                                    @if ($track->user->role === 'client')
                                                                        <a href="{{ route('clients.show', $track->user->id) }}">
                                                                    @elseif ($track->user->role === 'worker')
                                                                        <a href="{{ route('workers.show', $track->user->id) }}">
                                                                    @else
                                                                        <a href="{{ route('users.show', $track->user->id) }}">
                                                                    @endif {{ $track->user->name }}
                                                                        </a>
                                                                @endif
                                                            </th>
                                                        </tr>
                                                    @endforeach
                                                    </tbody>
                                                </table>
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
@section('before_end')
    @parent
    <div class="modal fade text-left" id="inlineForm_{{ $order->id }}" tabindex="-1"
         role="dialog" aria-labelledby="myModalLabel33" style="display: none;"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <label class="modal-title text-text-bold-600" id="myModalLabel33">
                        @lang('admin.order_edit') ( #{{$order->order_no}} )
                    </label>
                    <button type="button" class="close" data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="POST"
                          action="{{ route('orders.update', $order->id) }}"
                          style="text-align: right;"
                          enctype="multipart/form-data">
                        @csrf
                        {{method_field('PUT')}}
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-md-2 label-control"
                                           style="padding: 0.75rem 1rem;">
                                        @lang('admin.the_worker')
                                    </label>
                                    <div class="col-md-10">
                                        <fieldset>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3">
                                                                    <i class="ft-user"></i></span>
                                                </div>
                                                <select name="worker"
                                                        class="form-control">
                                                    @foreach($workers as $worker)
                                                        <option
                                                            value="{{ $worker->id }}"
                                                            @if ($order->worker_id == $worker->id)
                                                            selected="selected"
                                                            @endif>
                                                            {{$worker->name}}
                                                        </option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-md-2 label-control"
                                           style="padding: 0.75rem 1rem;">
                                        @lang('admin.order_status')
                                    </label>
                                    <div class="col-md-10">
                                        <fieldset>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3">
                                                                    <i class="ft-check-circle"></i></span>
                                                </div>
                                                <select name="status"
                                                        class="form-control">
                                                    @foreach($status as $state)
                                                        <option
                                                            value="{{ array_search($state, $status) }}"
                                                            @if ($order->status_name === $state)
                                                            selected="selected"
                                                            @endif>
                                                            {{ $state }}
                                                        </option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-md-2 label-control"
                                           style="padding: 0.75rem 1rem;">@lang('admin.day')</label>
                                    <div class="col-md-10">
                                        <fieldset>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-calendar"></i></span>
                                                </div>
                                                <input id="day" type="date"
                                                       class="form-control @error('day') is-invalid @enderror"
                                                       name="day"
                                                       value="@if(old('day')){{old('day')}}@else{{ date('Y-m-d', strtotime($order->day)) }}@endif"
                                                       required
                                                       autocomplete="day">
                                                @error('day')
                                                <span class="invalid-feedback"
                                                      role="alert">
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
                                    <label class="col-md-2 label-control"
                                           style="padding: 0.75rem 1rem;">@lang('admin.time')</label>
                                    <div class="col-md-10">
                                        <fieldset>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-calendar"></i></span>
                                                </div>
                                                <input id="time" type="time"
                                                       class="form-control @error('time') is-invalid @enderror"
                                                       name="time"
                                                       value="@if(old('time')){{old('time')}}@else{{ date('H:i', strtotime($order->time)) }}@endif"
                                                       required
                                                       autocomplete="time">
                                                @error('time')
                                                <span class="invalid-feedback"
                                                      role="alert">
                                                                                    <strong>{{ $message }}</strong>
                                                                                </span>
                                                @enderror
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            <input type="submit" class="btn btn-primary" value="@lang('admin.save')">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
