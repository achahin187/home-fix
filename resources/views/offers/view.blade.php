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
                        <a href="{{ route('offers.index') }}">
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
                <a class="dropdown-item" href="{{route('offers.edit', $offer->id)}}">
                    <i class="ft-edit icon-right"></i>@lang('admin.edit')
                </a>
                <a id="tr_{{$offer->id}}" href="#" class="delete_record dropdown-item"
                   data-url="{{route('offers.destroy', $offer->id)}}"
                   data-confirm-message="@lang("admin.delete_confirm|role:admin.the_offer")"
                   data-success-message="@lang("admin.delete_success|role:admin.the_offer")"
                   data-error-message="@lang("admin.delete_error|role:admin.the_offer")"
                   data-ok="@lang('admin.delete')"
                   data-cancel="@lang('admin.cancel')"
                   data-token="{{csrf_token()}}"
                   data-redirect="{{route('offers.index')}}">
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
                                <div class="col-sm-12">
                                    <div class="card-body"
                                         style="padding: 1.5rem 0 !important;">
                                        <img src="{{config('app.url')}}/{{$offer->image}}" alt="Offer Image"
                                             style="width: 100%;height: 50vh;">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span>
                                                            <strong>@lang('admin.name')</strong>
                                                        </span> :
                                                        <p style="display: inline;">
                                                            {{$offer->name}}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.price')</strong></span> :
                                                        <p style="display: inline;">
                                                            {{$offer->price}}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.description')</strong></span> :
                                                        <p style="display: inline;">
                                                            {{$offer->description}}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.end_at')</strong></span> :
                                                        <p style="display: inline;">
                                                            {{ date('d/m/Y h:i A', strtotime($offer->end_at)) }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.the_category')</strong></span> :
                                                        <p style="display: inline;">
                                                            {{ $offer->category->name }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="card border-bottom-info box-shadow-1 border-bottom-2">
                                                <div class="card-content">
                                                    <div class="card-body">
                                                        <span><strong>@lang('admin.status')</strong></span> :
                                                        <p style="display: inline;">
                                                            @if ($offer->status == true)
                                                                <i class="ft-check-circle" title="@lang('admin.active')"
                                                                   style="color:green"></i>
                                                                @lang('admin.s_verified')
                                                            @else
                                                                <i class="ft-x-circle" title="@lang('admin.un_active')"
                                                                   style="color:red"></i>
                                                                @lang('admin.s_un_verified')
                                                            @endif
                                                        </p>
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
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-content collapse show">
                        <div class="card-body card-dashboard">
                            <div class="card-title text-center font-medium-5 font-weight-bolder">
                                @lang('admin.the_workers')
                                <button data-toggle="modal" data-target="#inlineForm"
                                        class="btn btn-primary pull-left">
                                    <i class="ft-edit icon-right"></i>@lang('admin.offer_worker_choose')
                                </button>
                            </div>
                            <table style="width:100%"
                                   class="table table-striped table-bordered file-export table-responsive-1y1">
                                <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>@lang('admin.name')</th>
                                    <th>@lang('admin.email')</th>
                                    <th>@lang('admin.phone')</th>
                                    <th>@lang('admin.status')</th>
                                    <th style="border-right: 1px solid #E3EBF3">@lang('admin.settings')</th>
                                </tr>
                                </thead>
                                <tbody>
                                {? $counter = 0 ?}
                                @foreach($offer->workers as $worker)
                                    <tr class="text-center" id="tr_{{ $worker->id }}">
                                        <th>{{ ++$counter }}</th>
                                        <th>
                                            <a href="{{ route('workers.show', $worker->id) }}">
                                                {{ $worker->name }}
                                            </a>
                                        </th>
                                        <th>
                                            {{ $worker->email }}
                                        </th>
                                        <th>
                                            {{ $worker->phone }}
                                        </th>
                                        <th class="text-center">
                                            <a id="tr_{{$offer->id}}" href="#" class="verify_user"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('active.worker_offer', [
                                                                'worker' => $worker->id,
                                                                'offer' => $offer->id
                                                            ])}}"
                                               data-cancel="@lang('admin.cancel')"
                                               data-token="{{csrf_token()}}"
                                               @if ($worker->status == false)
                                               data-confirm-message="@lang("admin.verify_confirm|role:admin.the_worker")"
                                               data-success-message="@lang("admin.verify_success|role:admin.the_worker")"
                                               data-error-message="@lang("admin.verify_error|role:admin.the_worker")"
                                               data-ok="@lang('admin.verify_user')"
                                               title="@lang('admin.verify_user')">
                                                <i class="ft-x-circle" style="color: red;"></i>
                                                @else
                                                    data-confirm-message="@lang("admin.unverify_confirm|role:admin.the_worker")"
                                                    data-success-message="@lang("admin.unverify_success|role:admin.the_worker")"
                                                    data-error-message="@lang("admin.unverify_error|role:admin.the_worker")"
                                                    data-ok="@lang('admin.unverify_user')"
                                                    title="@lang('admin.unverify_user')">
                                                    <i class="ft-check-circle" style="color: green;"></i>
                                                @endif
                                            </a>
                                        </th>
                                        <th style="border-right: 1px solid #E3EBF3">
                                            <a id="tr_{{$offer->id}}" href="#" class="delete_record btn btn-danger"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('worker_offer.destroy', [
                                                                'worker' => $worker->id,
                                                                'offer' => $offer->id
                                                            ])}}"
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
@section('before_end')
    @parent
    <div class="modal fade text-left" id="inlineForm" tabindex="-1"
         role="dialog" aria-labelledby="myModalLabel33" style="display: none;"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <label class="modal-title text-text-bold-600" id="myModalLabel33">
                        @lang('admin.offer_worker_choose') ( {{$offer->id}} )
                    </label>
                    <button type="button" class="close" data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="POST"
                          action="{{ route('add.worker_offer', $offer->id) }}"
                          style="text-align: right;"
                          enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-md-2 label-control"
                                           style="padding: 0.75rem 1rem;">
                                        @lang('admin.the_worker')
                                    </label>
                                    <div class="col-md-9">
                                        <fieldset>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-list"></i></span>
                                                </div>
                                                @section('before_end')
                                                    @parent
                                                    <style>
                                                        .btn-light {
                                                            background: #fff !important;
                                                        }
                                                    </style>
                                                @endsection
                                                <div
                                                    class="dropdown bootstrap-select show-tick form-control">
                                                    <select data-dropup-auto="false"
                                                    class="selectpicker form-control"
                                                            name="workers[]"
                                                            title="@lang('admin.select_workers')"
                                                            multiple data-actions-box="true">
                                                        @foreach($workers as $worker)
                                                            <option
                                                                @if (search_assoc($worker->id, $offer->workers->toArray()))
                                                                selected="selected"
                                                                @endif
                                                                value="{{ $worker->id }}">
                                                                {{ $worker->name }}
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                @error('category')
                                                <span class="invalid-feedback" style="display: block;" role="alert">
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
