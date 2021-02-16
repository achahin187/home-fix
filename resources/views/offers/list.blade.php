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
            <a href="{{ route('offers.create') }}">
                <button class="btn btn-info round box-shadow-2 px-2"
                        type="button"><i class="ft-edit icon-left"></i>@lang('admin.add_offer')
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
                                    <th>@lang('admin.price')</th>
                                    <th>@lang('admin.the_category')</th>
                                    <th>@lang('admin.the_workers')</th>
                                    <th>@lang('admin.end_at')</th>
                                    <th>@lang('admin.status')</th>
                                    <th style="border-right: 1px solid #E3EBF3">@lang('admin.settings')</th>
                                </tr>
                                </thead>
                                <tbody>
                                {? $counter = 0 ?}
                                @foreach($offers as $offer)
                                    <tr class="text-center" id="tr_{{ $offer->id }}">
                                        <th><input type="checkbox" id="checkbox_{{ $offer->id }}"></th>
                                        <th class="text-center">{{ ++$counter }}</th>
                                        <th>
                                            <a href="{{ route('offers.show', $offer->id) }}">
                                                {{ $offer->name }}
                                            </a>
                                        </th>
                                        <th class="text-center">{{ $offer->price }}</th>
                                        <th class="text-center">
                                            @if (isset($offer->category))
                                            <a href="{{ route('categories.show', $offer->category->id) }}">
                                                {{ $offer->category->name }}
                                            </a>
                                            @endif
                                        </th>
                                        <th class="text-center">
                                            {{ count($offer->workers) }}
                                        </th>
                                        <th class="text-center"
                                            @if (app()->getLocale() === 'ar')
                                            style="direction: ltr;">
                                            {{ date('d/m/Y h:i A', strtotime($offer->end_at)) }}
                                            @else
                                                style="direction: rtl;">
                                                {{ date('d/m/Y h:i A', strtotime($offer->end_at)) }}
                                            @endif
                                        </th>
                                        <th class="text-center">
                                            <a id="tr_{{$offer->id}}" href="#" class="verify_user"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('active.offer', $offer->id)}}"
                                               data-cancel="@lang('admin.cancel')"
                                               data-token="{{csrf_token()}}"
                                               @if ($offer->status == false)
                                               data-confirm-message="@lang("admin.verify_confirm|role:admin.the_offer")"
                                               data-success-message="@lang("admin.verify_success|role:admin.the_offer")"
                                               data-error-message="@lang("admin.verify_error|role:admin.the_offer")"
                                               data-ok="@lang('admin.verify_user')"
                                               title="@lang('admin.verify_user')">
                                                <i class="ft-x-circle" style="color: red;"></i>
                                                @else
                                                    data-confirm-message="@lang("admin.unverify_confirm|role:admin.the_offer")"
                                                    data-success-message="@lang("admin.unverify_success|role:admin.the_offer")"
                                                    data-error-message="@lang("admin.unverify_error|role:admin.the_offer")"
                                                    data-ok="@lang('admin.unverify_user')"
                                                    title="@lang('admin.unverify_user')">
                                                    <i class="ft-check-circle" style="color: green;"></i>
                                                @endif
                                            </a>
                                        </th>
                                        <th style="border-right: 1px solid #E3EBF3">
                                            <a href="{{route('offers.edit', $offer->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.edit')" class="btn btn-success">
                                                <i class="ft-edit"></i>
                                            </a>
                                            <a href="{{route('offers.show', $offer->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.view')" class="btn btn-info">
                                                <i class="ft-eye"></i>
                                            </a>
                                            <a id="tr_{{$offer->id}}" href="#" class="delete_record btn btn-danger"
                                               style="padding: 0.25vw;"
                                               data-url="{{route('offers.destroy', $offer->id)}}"
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
                            data-page="/offers/"
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
