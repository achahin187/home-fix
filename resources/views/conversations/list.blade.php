@extends('layouts.app')

@section('title') {{ __('admin.chat_managment')}} @endsection

@section('content-header')
<div class="content-header-left col-md-6 col-12 mb-2">
    <h3 class="content-header-title">{{ __('admin.chat_managment')}}</h3>
    <div class="row breadcrumbs-top">
        <div class="breadcrumb-wrapper col-12">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="{{ route('admin') }}">
                        @lang('admin.control_panel')
                    </a>
                </li>
                <li class="breadcrumb-item">
                    <a href="{{ route('clients.index') }}">
                        {{ __('admin.chat_managment')}}
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
                                    <th>@lang('admin.the_order')</th>
                                    <th>@lang('admin.the_client')</th>
                                    <th>@lang('admin.the_worker')</th>
                                </tr>
                            </thead>
                            <tbody>
                                {? $counter = 0 ?}
                                @foreach($conversations as $conversation)
                                <tr class="text-center" id="tr_{{ $conversation->con_id }}">
                                    <th>{{ ++$counter }}</th>
                                    <th>
                                        <a href="{{ route('chats.show', ['id'=>$conversation->con_id]) }}">
                                            {{ $conversation->conversation_name }}
                                        </a>
                                    </th>
                                    <th>
                                        <a href="{{ route('clients.show', ['id'=>$conversation->client->id]) }}">
                                            {{ $conversation->client->name }}
                                        </a>
                                    </th>
                                    <th>
                                        <a href="{{ route('workers.show', ['id'=>$conversation->worker->id]) }}">
                                            {{ $conversation->worker->name }}
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
