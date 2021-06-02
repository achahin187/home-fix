@extends('layouts.app')

@section('title') {{ __('admin.features')}} @endsection

@section('content-header')
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title"> {{ __('admin.features')}}</h3>
        <div class="row breadcrumbs-top">
            <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin') }}">
                            @lang('admin.control_panel')
                        </a>
                    </li>
                    <li class="breadcrumb-item">
                        <a href="{{ route('features.index') }}">
                            {{ __('admin.features')}}
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
                                    <th>@lang('admin.image')</th>
                                    <th>@lang('admin.title')</th>
                                    <th>@lang('admin.text')</th>
                                    <th style="border-right: 1px solid #E3EBF3">@lang('admin.settings')</th>
                                </tr>
                                </thead>
                                <tbody>
                                {? $counter = 0 ?}
                                @foreach($features as $feature)
                                    <tr class="text-center" id="tr_{{ $feature->id }}">
                                        <th class="text-center">{{ ++$counter }}</th>
                                        <th class="text-center"> <img src="{{$feature->image}}" alt="feature Image" style="height: 29vh;"></th>
                                        <th>
                                            <a href="{{ route('features.show', $feature->id) }}">
                                                {{ $feature->{App::getLocale().'_title'} }}
                                            </a>
                                        </th>
                                        <th class="text-center">{{ $feature->{App::getLocale().'_section'} }}</th>

                                        <th style="border-right: 1px solid #E3EBF3">
                                            <a href="{{route('features.edit', $feature->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.edit')" class="btn btn-success">
                                                <i class="ft-edit"></i>
                                            </a>
                                            <a href="{{route('features.show', $feature->id)}}"
                                               style="padding: 0.25vw;"
                                               title="@lang('admin.view')" class="btn btn-info">
                                                <i class="ft-eye"></i>
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
