@extends('layouts.app')

@section('title')
@lang('admin.control_panel')
@endsection

@section('content')
<!-- eCommerce statistic -->
<div class="row">
    <div class="col-xl-3 col-lg-6 col-12">
        <div class="card pull-up">
            <div class="card-content">
                <div class="card-body">
                    <div class="media d-flex">
                        <div class="media-body text-left">
                            <h3 class="info">{{ $total_orders }}</h3>
                            <h6>{{ trans_choice('admin.order', $total_orders) }} .</h6>
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
                            <h3 class="warning">{{ $total_orders_prices . ' ' }}
                                <span class="warning"></span></h3>
                            <h6>@lang('admin.total_missions')</h6>
                        </div>
                        <div>
                            <i class="icon-pie-chart warning font-large-2 float-right"></i>
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
                            <h3 class="success row" style="margin-bottom: 2.5%">
                                <div class="col-md-8">
                                    {{ $clients }}
                                </div>
                                <div class="col-md-4" style="margin: 0;padding: 0;">
                                    {{ trans_choice('admin.clients_count', $clients) }}
                                </div>
                            </h3>
                            <h3 class="danger row" style="margin-bottom: 2.5%">
                                <div class="col-md-8">
                                    {{ $workers_c }}
                                </div>
                                <div class="col-md-4" style="margin: 0;padding: 0;">
                                    {{ trans_choice('admin.workers_count', $workers_c) }}
                                </div>
                            </h3>
                        </div>
                        <div>
                            <i class="icon-user-follow success font-large-2 float-right"></i>
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
                            <h3 class="danger">{{ round($reviews, 2) }}%</h3>
                            <h6>@lang('admin.customer_satisfaction')</h6>
                        </div>
                        <div>
                            <i class="icon-heart danger font-large-2 float-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row match-height">
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header card-header-transparent py-20">
                <div class="btn-group font-size-large">@lang('admin.total_paid_orders')</div>
                <ul class="nav nav-pills nav-pills-rounded chart-action float-right btn-group" role="group">
                    <li class="nav-item">
                        <a class="active nav-link chart-changer" data-toggle="tab" href="#revenue-per-day">
                            @lang('admin.day')
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link chart-changer" data-toggle="tab" href="#revenue-per-week">
                            @lang('admin.week')
                        </a></li>
                    <li class="nav-item">
                        <a class="nav-link chart-changer" data-toggle="tab" href="#revenue-per-month">
                            @lang('admin.month')
                        </a></li>
                    <li class="nav-item">
                        <a class="nav-link chart-changer" data-toggle="tab" href="#revenue-per-year">
                            @lang('admin.year')
                        </a></li>
                </ul>
            </div>
            {{--<div class="card-header card-header-transparent py-20">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group row">
                                <label class="col-md-3 label-control"
                                       style="padding: 0.75rem 1rem;" for="from">
                                    @lang('admin.from')
                                </label>
                                <div class="col-md-9">
                                    <fieldset>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon3">
                                                    <i class="ft-calendar"></i></span>
                                            </div>
                                            <input type="date" name="from" id="from" class="form-control">
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group row">
                                <label class="col-md-3 label-control"
                                       style="padding: 0.75rem 1rem;" for="to">
                                    @lang('admin.to')
                                </label>
                                <div class="col-md-9">
                                    <fieldset>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon3">
                                                    <i class="ft-calendar"></i></span>
                                            </div>
                                            <input type="date" name="to" id="to" class="form-control">
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>--}}
            <div class="card-content">
                <div class="card-body widget-content tab-content bg-white p-20">
                    <div id="revenue-per-day" style="position: relative;"
                        class="active ct-chart tab-pane scoreLineShadow height-400"></div>
                    <div id="revenue-per-week" style="position: relative;"
                        class="ct-chart tab-pane scoreLineShadow height-400"></div>
                    <div id="revenue-per-month" style="position: relative;"
                        class="ct-chart tab-pane scoreLineShadow height-400"></div>
                    <div id="revenue-per-year" style="position: relative;"
                        class="ct-chart tab-pane scoreLineShadow height-400"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div id="recent-transactions" class="col-12">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title text-center font-medium-4 font-weight-bolder">
                    @lang('admin.new_orders')
                </h4>
            </div>
            <div class="card-content">
                <div class="table-responsive-1y1">
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
                                <th>@lang('admin.order_no')</th>
                                <th>@lang('admin.the_worker')</th>
                                <th>@lang('admin.the_client')</th>
                                <th>@lang('admin.total_price')</th>
                                <th>@lang('admin.buy_date')</th>
                                <th>@lang('admin.status')</th>
                                <th>@lang('admin.settings')</th>
                            </tr>
                        </thead>
                        <tbody>
                            {? $counter = 0 ?}
                            @foreach($new_orders as $order)
                            <tr class="text-center" id="tr_{{ $order->id }}">
                                <th>{{ ++$counter }}</th>
                                <th>
                                    <a href="{{ route('orders.show', $order->id) }}">
                                        #{{ $order->order_no }}
                                    </a>
                                </th>
                                <th>
                                    <a href="@if ($order->worker['id'])
                                            {{ route('workers.show', $order->worker['id']) }}
                                            @else#@endif">
                                        @if ($order->worker['id'])
                                        {{ $order->worker['name'] }}
                                        @else
                                        @lang('admin.order_need_worker')
                                        @endif
                                    </a>
                                </th>
                                <th>
                                    <a
                                        href="@if ($order->client['id']){{ route('clients.show', $order->client['id']) }}@endif">
                                        {{ $order->client['name'] }}
                                    </a>
                                </th>
                                <th>{{ $order->total_price }} {{ $order->currency }}</th>
                                <th>{{ date('d/m/Y h:i A', strtotime($order->created_at)) }}</th>
                                <th>{{ $order->status_name }}</th>
                                <th style="text-align: center;">
                                    <button data-toggle="modal" data-target="#inlineForm_{{$order->id}}"
                                        style="padding: 5%;" class="btn btn-success" title="@lang('admin.edit')">
                                        <i class="ft-edit"></i>
                                    </button>
                                    <a href="{{route('orders.show', $order->id)}}" style="padding: 5%;"
                                        class="btn btn-info" title="@lang('admin.view')">
                                        <i class="ft-eye"></i>
                                    </a>
                                    <a id="tr_{{$order->id}}" href="#" style="padding: 5%;"
                                        class="delete_record btn btn-danger"
                                        data-url="{{route('orders.destroy', $order->id)}}" data-confirm-message="@lang("
                                        admin.delete_confirm|role:admin.the_order")" data-success-message="@lang("
                                        admin.delete_success|role:admin.the_order")" data-error-message="@lang("
                                        admin.delete_error|role:admin.the_order")" data-ok="@lang('admin.delete')"
                                        data-cancel="@lang('admin.cancel')" data-token="{{csrf_token()}}"
                                        title="@lang('admin.delete')">
                                        <i class="ft-trash-2"></i>
                                    </a>
                                </th>
                            </tr>
                            <div id="table-options-{{$order->id}}" class="toolbar-icons hidden">
                            </div>
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
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form method="POST" action="{{ route('orders.update', $order->id) }}"
                                                style="text-align: right;" enctype="multipart/form-data">
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
                                                                            <span class="input-group-text"
                                                                                id="basic-addon3">
                                                                                <i class="ft-user"></i></span>
                                                                        </div>
                                                                        <select name="worker" class="form-control">
                                                                            @foreach($workers as $worker)
                                                                            <option value="{{ $worker->id }}" @if($order->worker_id == $worker->id)
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
                                                                            <span class="input-group-text"
                                                                                id="basic-addon3">
                                                                                <i class="ft-check-circle"></i></span>
                                                                        </div>
                                                                        <select name="status" class="form-control">
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
                                                                            <span class="input-group-text"
                                                                                id="basic-addon3"><i
                                                                                    class="ft-calendar"></i></span>
                                                                        </div>
                                                                        <input id="day" type="date"
                                                                            class="form-control @error('day') is-invalid @enderror"
                                                                            name="day"
                                                                            value="@if(old('day')){{old('day')}}@else{{ date('Y-m-d', strtotime($order->day)) }}@endif"
                                                                            required autocomplete="day">
                                                                        @error('day')
                                                                        <span class="invalid-feedback" role="alert">
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
                                                                            <span class="input-group-text"
                                                                                id="basic-addon3"><i
                                                                                    class="ft-calendar"></i></span>
                                                                        </div>
                                                                        <input id="time" type="time"
                                                                            class="form-control @error('time') is-invalid @enderror"
                                                                            name="time"
                                                                            value="@if(old('time')){{old('time')}}@else{{ date('H:i', strtotime($order->time)) }}@endif"
                                                                            required autocomplete="time">
                                                                        @error('time')
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
                                                    <input type="submit" class="btn btn-primary"
                                                        value="@lang('admin.save')">
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
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('header')
@parent
<link rel="stylesheet" type="text/css" href="{{ asset('vendors/css/charts/chartist.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('vendors/css/charts/chartist-plugin-tooltip.css') }}">
@endsection

@section('before_end')
@parent
<script src="{{ asset('vendors/js/charts/chartist.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('vendors/js/charts/chartist-plugin-tooltip.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('vendors/js/charts/chartist-plugin-axistitle.js') }}" type="text/javascript"></script>
<script>
    new Chartist.Line('#revenue-per-day', {
            labels: [@foreach($revenue as $rev)'{{$rev->date}}',@endforeach],
            series: [
                [@foreach($revenue as $rev){{round($rev->prices,2)}},@endforeach],
            ]
        }, {
            plugins: [
                Chartist.plugins.tooltip()
            ]
        });
        $('.chart-changer').on('click', function (e) {
            e.preventDefault();
            if ($(this).attr('href') === '#revenue-per-day') {
                var q = 'day';
            } else if ($(this).attr('href') === '#revenue-per-week') {
                var q = 'week';
            } else if ($(this).attr('href') === '#revenue-per-month') {
                var q = 'month';
            } else if ($(this).attr('href') === '#revenue-per-year') {
                var q = 'year';
            } else {
                var q = 'day';
            }

            var chart_id = $(this).attr('href');

            $.ajax({
                url: '/getRevenueBy',
                type: 'GET',
                data: 'q=' + q,
                success: function (data) {
                    var labels = [],
                        series = [];
                    data.forEach(function (item) {
                        labels.push(item.date);
                        series.push(item.prices);
                    });
                    new Chartist.Line(chart_id, {
                        labels: labels,
                        series: [series]
                    }, {
                        plugins: [
                            Chartist.plugins.tooltip()
                        ]
                    }).on('mousemove', function (event) {
                        $toolTip.css({
                            left: (event.originalEvent.layerX || event.offsetX) - $toolTip.width() / 2 - 10,
                            top: (event.originalEvent.layerY || event.offsetY) - $toolTip.height() - 40
                        });
                    });
                }
            });


        });
</script>
<style>
    [lang='ar'] .ct-label.ct-horizontal.ct-end {
        justify-content: flex-end !important;
    }
</style>
@endsection
