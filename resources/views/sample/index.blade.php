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
                                    <div class="btn-group float-md" style="color:white;margint:5px" role="group" aria-label="Button group with nested dropdown">
                                        <a href="{{ route('export_model_service') }}" type="button" class="btn btn-info round box-shadow-2 px-2">
                                            <i class="fas fa-file-download"></i> @lang('admin.download_model_services')
                                        </a>
                                    </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">3</th>
                                <td>
                                    <div class="btn-group float-md" style="color:white;margin:5px" role="group" aria-label="Button group with nested dropdown">
                                        <a href="{{ route('category') }}" type="button" class="btn btn-info round box-shadow-2 px-2">
                                            <i class="fas fa-file-download"></i> @lang('admin.export_for_categories')
                                        </a>
                                    </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">4</th>
                                <td>
                                    <div class="btn-group float-md" style="color:white;margin:5px" role="group" aria-label="Button group with nested dropdown">
                                        <a href="{{ route('subcategory') }}" type="button" class="btn btn-info round box-shadow-2 px-2">
                                            <i class="fas fa-file-download"></i> @lang('admin.export_for_subcategories')
                                        </a>
                                    </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">5</th>
                                <td>
                                    <div class="btn-group float-md" style="color:white;margin:5px" role="group" aria-label="Button group with nested dropdown">
                                        <button type="button" class="btn btn-info round box-shadow-2 px-2" data-toggle="modal"
                                        data-target="#exampleModal">
                                        <i class="fas fa-file-import"></i> @lang('admin.export_countries')
                                    </button>
                                    </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">6</th>
                                <td>
                                    <div class="btn-group float-md" style="color:white;margin:5px" role="group" aria-label="Button group with nested dropdown">
                                        <a href="{{ route('export_services') }}" type="button" class="btn btn-info round box-shadow-2 px-2">
                                            <i class="fas fa-file-download"></i> @lang('admin.export_services')
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



            <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">@lang('admin.export_countries')</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group">
                             @foreach ($countries as $country)
                             <li class="list-group-item d-flex justify-content-between align-items-center">
                                 {{ $country->name }}

                                <div class="btn-group" style="color:white;margin:5px" role="group" aria-label="Button group with nested dropdown">
                                  <a href="{{ route('export_country', $country->id ) }}" type="button" class="btn btn-info round box-shadow-2 px-2">
                                      <i class="fas fa-file-download"></i> @lang('admin.Export')
                                  </a>  
                                </div>             
                              </li>
                             @endforeach
                             <li class="list-group-item d-flex justify-content-between align-items-center">

                             <div class="btn-group" style="color:white;margin:5px" role="group" aria-label="Button group with nested dropdown">
                                <a href="{{ route('export_all_countries') }}" type="button" class="btn btn-info round box-shadow-2 px-2">
                                    <i class="fas fa-file-download"></i> @lang('admin.Export_all_countries')
                                </a>  
                              </div>
                             </li>
                                  
                           
                          </ul>


                    </div>
                  
                </div>
            </div>
        </div>
        <!-------------------->
    </section>
@endsection
