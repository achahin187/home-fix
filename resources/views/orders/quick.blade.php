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
@endsection

@section('content')
    <section id="file-export">
        <div class="row">
            <div class="col-xl-3 col-lg-6 col-12">
                <div class="card pull-up">
                    <div class="card-content">
                        <div class="card-body">
                            <div class="media d-flex">
                                <div class="media-body text-left">
                                    <h3 class="info">{{ count($orders) }}</h3>
                                    <h6>@lang('admin.total_order_number')</h6>
                                </div>
                                <div>
                                    <i class="icon-basket-loaded info font-large-2 float-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-12">
                <div class="card pull-up">
                    <div class="card-content">
                        <div class="card-body">
                            <div class="media d-flex">
                                <div class="media-body text-left">
                                    <h3 class="warning data_to_fit">{{ $totalOrdersPrice }} </h3>
                                    <h6>@lang('admin.total_paid_orders')</h6>
                                </div>
                                <div>
                                    <i class="icon-fire warning font-large-2 float-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-12">
                <div class="card pull-up">
                    <div class="card-content">
                        <div class="card-body">
                            <div class="media d-flex">
                                <div class="media-body text-left">
                                    <h3 class="danger">{{ $canceledOrders }}</h3>
                                    <h6>@lang('admin.canceled_orders')</h6>
                                </div>
                                <div>
                                    <i class="icon-close danger font-large-2 float-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-12">
                <div class="card pull-up">
                    <div class="card-content">
                        <div class="card-body">
                            <div class="media d-flex">
                                <div class="media-body text-left">
                                    <h3 class="success">{{ $completedOrders }}</h3>
                                    <h6>@lang('admin.completed_orders')</h6>
                                </div>
                                <div>
                                    <i class="icon-heart success font-large-2 float-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                            @section('before_end')
                                @parent
                                <script>
                                    $('.dataTables_filter').html('' +
                                        '<div class="form-group row">\n' +
                                        '    <label class="col-md-2 label-control" for="name">\n' +
                                        '        @lang("admin.filter_order")</label>\n' +
                                        '    <div class="col-md-3">\n' +
                                        '        <fieldset>\n' +
                                        '            <div class="input-group">\n' +
                                        '                <select name="order_stauts"\n' +
                                        '                        id="order_filter" class="form-control">\n' +
                                        '                    <option value="">\n' +
                                        '                        @lang("admin.choose_status")\n' +
                                        '                    </option>\n' +
                                        '                    <option value="' + '@lang("admin.order_need_worker")' + '">' +
                                        '                        @lang("admin.orders_need_worker")\n' +
                                        '                    </option>\n' +
                                        '                    <option value="' +
                                        "@lang('app.PENDING')|@lang('app.ACCEPTED')|@lang('app.ARRIVED')|" +
                                        "@lang('app.PRICE_VALIDATION')|@lang('app.STARTED')|@lang('app.CHECKING')"
                                        + '">\n' +
                                        '                        @lang("admin.pending")</option>\n' +
                                        '                    <option value="' + "@lang('app.CANCELED')" + '">' +
                                        '@lang("app.CANCELED")</option>\n' +
                                        '                    <option value="' + "@lang('app.COMPLETED')" + '">' +
                                        '@lang("app.COMPLETED")</option>\n' +
                                        '                </select>\n' +
                                        '            </div>\n' +
                                        '        </fieldset>\n' +
                                        '    </div>\n' +
                                        '</div>');
                                    // Event listener to the two range filtering inputs to redraw on input
                                    $('#order_filter').on('change', function () {
                                        fileExportTable.search(
                                            '(' + $(this).val() + ')', true, false
                                        ).draw();
                                    });
                                </script>
                            @endsection
                            <table style="width:100%"
                                   class="table table-striped table-bordered file-export table-responsive-1y1">
                                <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>#</th>
                                    <th>@lang('admin.order_no')</th>
                                    <th>@lang('admin.the_worker')</th>
                                    <th>@lang('admin.the_client')</th>
                                    <th>@lang('admin.the_category')</th>
                                    <th>@lang('admin.total_price') </th>
                                    <th>@lang('admin.buy_date')</th>
                                    <th>@lang('admin.status')</th>
                                    <th>@lang('admin.settings')</th>
                                </tr>
                                </thead>
                                <tbody>
                                {? $counter = 0 ?}
                                @foreach($orders as $order)
                                    <tr class="text-center" id="tr_{{ $order['id'] }}">
                                            <th><input type="checkbox" id="checkbox_{{ $order['id'] }}"></th>
                                            <th>{{ ++$counter }}</th>
                                        <th>
                                            @if ($order['offer_id'] != null)
                                                <a href="{{ route('offer.order', $order['id']) }}">
                                                    #{{ $order['order_no'] }}
                                                </a>
                                            @else
                                                <a href="{{ route('orders.show', $order['id']) }}">
                                                    #{{ $order['order_no'] }}
                                                </a>
                                            @endif
                                        </th>
                                        <th>
                                            <a
                                                href="@if ($order['worker']['id'])
                                                {{ route('workers.show', $order['worker']['id']) }}
                                                @else#@endif">
                                                @if ($order['worker']['id'])
                                                    {{ $order['worker']['name'] }}
                                                @else
                                                    @lang('admin.order_need_worker')
                                                @endif
                                            </a>
                                        </th>
                                        <th>
                                            <a href="@if ($order['client']['id']){{ route('clients.show', $order['client']['id']) }}@endif">
                                                {{ $order['client']['name'] }}
                                            </a>
                                        </th>
                                        {? $category = getOrderCategory($order['id']) ?}
                                        <th>
                                            <a href="{{ route('categories.show', $category['id']) }}">
                                            {{ $category->name }}
                                        </a>
                                        </th>
                                        <th>{{ $order['total_price'] }} {{ $order['currency'] }}</th>
                                        <th @if (changeLateOrderColor($order['id']) === true)
                                            style="color: red"
                                        @endif>{{ date('d/m/Y h:i A', strtotime($order['created_at'])) }}</th>
                                        <th>{{ $order['status_name'] }}</th>
                                        <th style="text-align: center;">
                                            <button data-toggle="modal" data-target="#inlineForm_{{$order['id']}}"
                                                    style="padding: 5%;"
                                                    class="btn btn-success"
                                                    title="@lang('admin.edit')">
                                                <i class="ft-edit"></i>
                                            </button>
                                            <a href="{{route('orders.show', $order['id'])}}"
                                               style="padding: 5%;"
                                               class="btn btn-info"
                                               title="@lang('admin.view')">
                                                <i class="ft-eye"></i>
                                            </a>
                                            <a id="tr_{{$order['id']}}" href="#"
                                               style="padding: 5%;"
                                               class="delete_record btn btn-danger"
                                               data-url="{{route('orders.destroy', $order['id'])}}"
                                               data-confirm-message="@lang("admin.delete_confirm|role:admin.the_order")"
                                               data-success-message="@lang("admin.delete_success|role:admin.the_order")"
                                               data-error-message="@lang("admin.delete_error|role:admin.the_order")"
                                               data-ok="@lang('admin.delete')"
                                               data-cancel="@lang('admin.cancel')"
                                               data-token="{{csrf_token()}}"
                                               title="@lang('admin.delete')">
                                                <i class="ft-trash-2"></i>
                                            </a>
                                        </th>
                                    </tr>
                                    <div id="table-options-{{$order['id']}}" class="toolbar-icons hidden">
                                    </div>
                                @section('before_end')
                                    @parent
                                    <div class="modal fade text-left" id="inlineForm_{{ $order['id'] }}" tabindex="-1"
                                         role="dialog" aria-labelledby="myModalLabel33" style="display: none;"
                                         aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <label class="modal-title text-text-bold-600" id="myModalLabel33">
                                                        @lang('admin.order_edit') ( #{{$order['order_no']}} )
                                                    </label>
                                                    <button type="button" class="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <form method="POST"
                                                          action="{{ route('orders.update', $order['id']) }}"
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
                                                                                            value="{{ $worker['id'] }}"
                                                                                            @if ($order['worker_id'] == $worker['id'])
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
                                                                                            @if ($order['status_name'] === $state)
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
                                                                                       value="@if(old('day')){{old('day')}}@else{{ date('Y-m-d', strtotime($order['day'])) }}@endif"
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
                                                                                       value="@if(old('time')){{old('time')}}@else{{ date('H:i', strtotime($order['time'])) }}@endif"
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
                                                            <div class="col-md-12">
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 label-control"
                                                                           style="padding: 0.75rem 1rem;">@lang('admin.image')</label>
                                                                    <div class="col-md-9">
                                                                        <fieldset>
                                                                            <div class="input-group">
                                                                                <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-image"></i></span>
                                                                                </div>
                                                                                <input id="attachment" type="file"
                                                                                       class="form-control @error('attachment') is-invalid @enderror"
                                                                                       name="attachment">
                                                                                @error('attachment')
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
                                                        <div class="text-right">
                                                            <input type="submit" class="btn btn-primary" value="@lang('admin.save')">
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endsection
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
                            data-page="/orders/"
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
