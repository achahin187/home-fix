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
                        <a href="{{ route('reviews.index') }}">
                            {{ $mainTitle }}
                        </a>
                    </li>
                </ol>
            </div>
        </div>
    </div>
@endsection

@section('content')
    @if ($role)
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
                                        <th>@lang('admin.review_content')</th>
                                        <th>@lang('admin.the_review')</th>
                                        @if ($role === 'worker')
                                            <th>@lang('admin.the_worker')</th>
                                        @endif
                                        @if ($role === 'client')
                                            <th>@lang('admin.the_client')</th>
                                        @endif
                                        <th>@lang('admin.the_order')</th>
                                        <th style="border-right: 1px solid #E3EBF3">@lang('admin.settings')</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {? $counter = 0 ?}
                                    @foreach($reviews as $review)
                                        @if (isset($review->user->name))
                                            <tr class="text-center" id="tr_{{ $review->id }}">
                                                <th class="text-center">{{ ++$counter }}</th>
                                                <th class="blue">
                                                    {{ mb_substr($review->comment, 0, 20) }}
                                                </th>
                                                <th class="text-center">
                                                    <div id="review-stars_{{$review->id}}"
                                                        
                                                         title="@lang('admin.the_review')">
                                                    </div>
                                                    @section('before_end')
                                                        @parent
                                                        <script>
                                                            $('#review-stars_{{$review->id}}').raty({
                                                                readOnly: true,
                                                                score: '{{round($review->review, 2)}}',
                                                                starHalf: '{{asset("images/raty/star-half.png")}}',
                                                                starOff: '{{asset("images/raty/star-off.png")}}',
                                                                starOn: '{{asset("images/raty/star-on.png")}}',
                                                                hints: [
                                                                    "@lang('admin.the_review'): " + "{{ round($review->review, 2) }}",
                                                                    "@lang('admin.the_review'): " + "{{ round($review->review, 2) }}",
                                                                    "@lang('admin.the_review'): " + "{{ round($review->review, 2) }}",
                                                                    "@lang('admin.the_review'): " + "{{ round($review->review, 2) }}",
                                                                    "@lang('admin.the_review'): " + "{{ round($review->review, 2) }}",
                                                                ],
                                                                half: true
                                                            });
                                                        </script>
                                                    @endsection
                                                </th>
                                                <th class="text-center">
                                                    @if ($role === 'worker')
                                                        <a href="{{ route('workers.show', $review->user->id) }}">
                                                    @endif
                                                    @if ($role === 'client')
                                                        <a href="{{ route('clients.show', $review->user->id) }}">
                                                    @endif
                                                        {{ $review->user->name }}
                                                    </a>
                                                </th>

                                                <th class="text-center">
                                                    <a @if( $review->order->offer_id == null)
                                                       href="{{ route('orders.show', $review->order->id) }}"
                                                       @else
                                                       href="{{ route('offer.order', $review->order->id) }}"
                                                    @endif>
                                                        # {{ $review->order->order_no }}
                                                    </a>
                                                </th>
                                                <th style="border-right: 1px solid #E3EBF3">
                                                    <a href="#"
                                                       style="padding: 0.25vw;"
                                                       onclick="view_review('{{$review->comment}}',
                                                           '@lang("admin.client_review") {{ $review->user->name }}')"
                                                       title="@lang('admin.view')" class="btn btn-info">
                                                        <i class="ft-eye"></i>
                                                    </a>
                                                    <a id="tr_{{$review->id}}" href="#"
                                                       class="delete_record btn btn-danger"
                                                       style="padding: 0.25vw;"
                                                       data-url="{{route('reviews.destroy', $review->id)}}"
                                                       data-confirm-message="@lang("admin.delete_confirm|role:admin.the_review")"
                                                       data-success-message="@lang("admin.delete_success|role:admin.the_review")"
                                                       data-error-message="@lang("admin.delete_error|role:admin.the_review")"
                                                       data-ok="@lang('admin.delete')"
                                                       data-cancel="@lang('admin.cancel')"
                                                       data-token="{{csrf_token()}}"
                                                       title="@lang('admin.delete')">
                                                        <i class="ft-trash-2"></i>
                                                    </a>
                                                </th>
                                            </>
                                        @endif
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    @else
        <div class="row text-center">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-content">
                        <div class="card-body">
                            <div class="row col-8" style="margin: 0 auto;">
                                <div class="col-md-6">
                                    <a href="{{ route('reviews.index', 'client') }}"
                                       class="btn btn-success btn-block"
                                       style="font-size: medium;font-weight: bold;">
                                        <i class="ft-star"></i>
                                        @lang('admin.clients_reviews')</a>
                                </div>
                                <div class="col-md-6">
                                    <a href="{{ route('reviews.index', 'worker') }}"
                                       class="btn btn-info btn-block"
                                       style="font-size: medium;font-weight: bold;">
                                        <i class="ft-star"></i>
                                        @lang('admin.workers_reviews')</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif
@endsection
