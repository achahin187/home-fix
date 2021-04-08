@extends('layouts.app')

@section('title') {{ __('admin.samples')}} @endsection

@section('content-header')
    <div class="content-header-left col-md-6 col-12 mb-2">
        <h3 class="content-header-title">{{ __('admin.samples')}}</h3>
        <div class="row breadcrumbs-top">
            <div class="breadcrumb-wrapper col-12">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="{{ route('admin') }}">
                            @lang('admin.control_panel')
                        </a>
                    </li>
                    <li class="breadcrumb-item">
                        <a href="{{ route('index_sample') }}">
                            {{ __('admin.samples')}}
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
                        <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">{{ __('admin.samples') }}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">1</th>
                                <td>
                                    <div class="btn-group float-md" style="color:white;margin:5px" role="group" aria-label="Button group with nested dropdown">
                                        <a href="{{ route('export_model') }}" type="button" class="btn btn-info round box-shadow-2 px-2">
                                            <i class="fas fa-file-download"></i> @lang('admin.download_model_for_workers')
                                        </a>
                                    </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">2</th>
                                <td>
                                    <div class="btn-group float-md" style="color:white;margin:5px" role="group" aria-label="Button group with nested dropdown">
                                        <a href="{{ route('category') }}" type="button" class="btn btn-info round box-shadow-2 px-2">
                                            <i class="fas fa-file-download"></i> @lang('admin.export_for_categories')
                                        </a>
                                    </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">3</th>
                                <td>
                                    <div class="btn-group float-md" style="color:white;margin:5px" role="group" aria-label="Button group with nested dropdown">
                                        <a href="{{ route('subcategory') }}" type="button" class="btn btn-info round box-shadow-2 px-2">
                                            <i class="fas fa-file-download"></i> @lang('admin.export_for_subcategories')
                                        </a>
                                    </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">4</th>
                                <td>
                                    <div class="btn-group float-md" style="color:white;margin:5px" role="group" aria-label="Button group with nested dropdown">
                                        <a href="{{ route('export_model') }}" type="button" class="btn btn-info round box-shadow-2 px-2">
                                            <i class="fas fa-file-download"></i> @lang('admin.export_countries')
                                        </a>
                                    </div>
                                </td>
                              </tr>
                            
                            </tbody>
                          </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
