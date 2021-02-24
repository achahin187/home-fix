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
                        <a href="{{ route('admin.settings') }}">
                            {{ $title }}
                        </a>
                    </li>
                </ol>
            </div>
        </div>
    </div>
@endsection

@section('content')
    <section id="horizontal-form-layouts">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header" style="padding: 0;">
                        <div class="heading-elements">
                            <ul class="list-inline mb-0">
                                <li><a data-action="expand"><i class="ft-maximize"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-content collpase show">
                        <div class="card-body">
                            <form method="POST" action="{{ route('update.settings') }}"
                                  style="text-align: right;"
                                  enctype="multipart/form-data">
                                @csrf
                                {{method_field('PUT')}}
                                <div class="form-body">
                                    <h4 class="form-section"><i class="ft-settings"></i>
                                        @lang('admin.settings')
                                    </h4>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.company')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-command"></i></span>
                                                            </div>
                                                            <input id="company" type="text"
                                                                   class="form-control @error('company') is-invalid @enderror"
                                                                   name="company"
                                                                   value="@if (old('company')){{ old('company') }}@else{{ $company }}@endif"
                                                                   autocomplete="new-company">
                                                            @error('company')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.call_company_phone')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-command"></i></span>
                                                            </div>
                                                            <input id="company_phone" type="text"
                                                                   class="form-control @error('company_phone') is-invalid @enderror"
                                                                   name="company_phone"
                                                                   value="@if (old('company_phone')){{ old('company_phone') }}@else{{ $company_phone }}@endif"
                                                                   autocomplete="new-company_phone">
                                                            @error('company_phone')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.whatsapp_company_phone')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-command"></i></span>
                                                            </div>
                                                            <input id="whatsapp_phone" type="text"
                                                                   class="form-control @error('whatsapp_phone') is-invalid @enderror"
                                                                   name="whatsapp_phone"
                                                                   value="@if (old('whatsapp_phone')){{ old('whatsapp_phone') }}@else{{ $whatsapp_phone }}@endif"
                                                                   autocomplete="new-whatsapp_phone">
                                                            @error('whatsapp_phone')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">Email</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-command"></i></span>
                                                            </div>
                                                            <input id="email" type="text"
                                                                   class="form-control @error('email') is-invalid @enderror"
                                                                   name="email"
                                                                   value="@if (old('email')){{ old('email') }}@else{{ $email }}@endif"
                                                                   autocomplete="new-email">
                                                            @error('email')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">Facebook</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-command"></i></span>
                                                            </div>
                                                            <input id="facebook" type="text"
                                                                   class="form-control @error('facebook') is-invalid @enderror"
                                                                   name="facebook"
                                                                   value="@if (old('facebook')){{ old('facebook') }}@else{{ $facebook }}@endif"
                                                                   autocomplete="new-facebook">
                                                            @error('facebook')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">Twitter</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-command"></i></span>
                                                            </div>
                                                            <input id="twitter" type="text"
                                                                   class="form-control @error('twitter') is-invalid @enderror"
                                                                   name="twitter"
                                                                   value="@if (old('twitter')){{ old('twitter') }}@else{{ $twitter }}@endif"
                                                                   autocomplete="new-twitter">
                                                            @error('twitter')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">Instagram</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-command"></i></span>
                                                            </div>
                                                            <input id="instagram" type="text"
                                                                   class="form-control @error('instagram') is-invalid @enderror"
                                                                   name="instagram"
                                                                   value="@if (old('instagram')){{ old('instagram') }}@else{{ $instagram }}@endif"
                                                                   autocomplete="new-instagram">
                                                            @error('instagram')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.worker_start_at')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-clock"></i></span>
                                                            </div>
                                                            <input id="start_at" type="time"
                                                                   class="form-control @error('start_at') is-invalid @enderror"
                                                                   name="start_at"
                                                                   value="@if (old('start_at')){{ old('start_at') }}@else{{ date('H:i', strtotime($start_at)) }}@endif"
                                                                   autocomplete="new-start_at">
                                                            @error('start_at')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.worker_close_at')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-clock"></i></span>
                                                            </div>
                                                            <input id="close_at" type="time"
                                                                   class="form-control @error('close_at') is-invalid @enderror"
                                                                   name="close_at"
                                                                   value="@if (old('close_at')){{ old('close_at') }}@else{{ date('H:i', strtotime($close_at))}}@endif"
                                                                   autocomplete="new-close_at">
                                                            @error('close_at')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.automatic_worker')</label>
                                                <div class="col-md-8">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <input id="automatic_worker" type="checkbox"
                                                                   class="form-control @error('automatic_worker') is-invalid @enderror"
                                                                   name="automatic_worker" value="1"
                                                                   @if ($automatic_worker == true)
                                                                   checked
                                                                @endif>
                                                            @error('automatic_worker')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.worker_late_after')</label>
                                                <div class="col-md-7">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon3"><i
                                                                            class="ft-clock"></i></span>
                                                            </div>
                                                            <input id="late_after" type="number"
                                                                   class="form-control @error('late_after') is-invalid @enderror"
                                                                   name="late_after"
                                                                   value="@if (old('late_after')){{ old('late_after') }}@else{{ $late_after }}@endif"
                                                                   autocomplete="new-late_after">
                                                            @error('late_after')
                                                            <span class="invalid-feedback" role="alert">
                                                                        <strong>{{ $message }}</strong>
                                                                    </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                <label class="col-md-2 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.hour')</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.terms_en')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon3"><i
                                                                            class="ft-clock"></i></span>
                                                            </div>
                                                            <textarea id="terms_en" name="terms_en"
                                                                      class="form-control @error('terms_en') is-invalid @enderror"
                                                                      autocomplete="new-terms_en">@if (old('terms_en')){{ old('terms_en') }}@else{{ $terms_en }}@endif</textarea>
                                                            @error('terms_en')
                                                            <span class="invalid-feedback" role="alert">
                                                                        <strong>{{ $message }}</strong>
                                                                    </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.terms_tr')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon3"><i
                                                                            class="ft-clock"></i></span>
                                                            </div>
                                                            <textarea id="terms_tr" name="terms_tr" dir="ltr"
                                                                      class="form-control @error('terms_tr') is-invalid @enderror"
                                                                      autocomplete="new-terms_tr">@if (old('terms_tr')){{ old('terms_tr') }}@else{{ $terms_tr }}@endif</textarea>
                                                            @error('terms_tr')
                                                            <span class="invalid-feedback" role="alert">
                                                                        <strong>{{ $message }}</strong>
                                                                    </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.terms_ar')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon3"><i
                                                                            class="ft-clock"></i></span>
                                                            </div>
                                                            <textarea id="terms_ar" name="terms_ar"
                                                                      class="form-control @error('terms_ar') is-invalid @enderror"
                                                                      autocomplete="new-terms_ar">@if (old('terms_ar')){{ old('terms_ar') }}@else{{ $terms_ar }}@endif</textarea>
                                                            @error('terms_ar')
                                                            <span class="invalid-feedback" role="alert">
                                                                        <strong>{{ $message }}</strong>
                                                                    </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.conditions_en')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon3"><i
                                                                            class="ft-clock"></i></span>
                                                            </div>
                                                            <textarea id="conditions_en" name="conditions_en"
                                                                      class="form-control @error('conditions_en') is-invalid @enderror"
                                                                      autocomplete="new-conditions_en">@if (old('conditions_en')){{ old('conditions_en') }}@else{{ $conditions_en }}@endif</textarea>
                                                            @error('conditions_en')
                                                            <span class="invalid-feedback" role="alert">
                                                                        <strong>{{ $message }}</strong>
                                                                    </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.conditions_tr')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon3"><i
                                                                            class="ft-clock"></i></span>
                                                            </div>
                                                            <textarea id="conditions_tr" name="conditions_tr" dir="ltr"
                                                                      class="form-control @error('conditions_tr') is-invalid @enderror"
                                                                      autocomplete="new-conditions_tr">@if (old('conditions_tr')){{ old('conditions_tr') }}@else{{ $conditions_tr }}@endif</textarea>
                                                            @error('conditions_tr')
                                                            <span class="invalid-feedback" role="alert">
                                                                        <strong>{{ $message }}</strong>
                                                                    </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.conditions_ar')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon3"><i
                                                                            class="ft-clock"></i></span>
                                                            </div>
                                                            <textarea id="conditions_ar" name="conditions_ar"
                                                                      class="form-control @error('conditions_ar') is-invalid @enderror"
                                                                      autocomplete="new-conditions_ar">@if (old('conditions_ar')){{ old('conditions_ar') }}@else{{ $conditions_ar }}@endif</textarea>
                                                            @error('conditions_ar')
                                                            <span class="invalid-feedback" role="alert">
                                                                        <strong>{{ $message }}</strong>
                                                                    </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang("admin.terms_image")</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon3"><i
                                                                            class="ft-clock"></i></span>
                                                            </div>
                                                            <input type="file" id="term_image" name="term_image"
                                                                   class="form-control @error('term_image') is-invalid @enderror"
                                                                   autocomplete="new-term_image">
                                                            @error('term_image')
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
                                    <h4 class="form-section"><i class="ft-inbox"></i>
                                        @lang('admin.notifications_settings')
                                    </h4>
                                    <h5><i class="ft-inbox"></i>
                                        @lang('admin.all_notifications_settings')
                                    </h5>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.n_new_order')</label>
                                                <div class="col-md-8">


                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_new_order" type="text"
                                                                   class="form-control @error('n_new_order') is-invalid @enderror"
                                                                   name="n_new_order[]"
                                                                   value="@if (old('n_new_order')){{ old('n_new_order') }}@else{{ $notifications_types['new_order']['tu'] }}@endif"
                                                                   autocomplete="new-n_new_order">
                                                            @error('n_new_order')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_new_order" type="text"
                                                                   class="form-control @error('n_new_order') is-invalid @enderror"
                                                                   name="n_new_order[]"
                                                                   value="@if (old('n_new_order')){{ old('n_new_order') }}@else{{ $notifications_types['new_order']['en'] }}@endif"
                                                                   autocomplete="new-n_new_order">
                                                            @error('n_new_order')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_new_order" type="text"
                                                                   class="form-control @error('n_new_order') is-invalid @enderror"
                                                                   name="n_new_order[]"
                                                                   value="@if (old('n_new_order')){{ old('n_new_order') }}@else{{ $notifications_types['new_order']['ar'] }}@endif"
                                                                   autocomplete="new-n_new_order">
                                                            @error('n_new_order')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>



                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.n_late_notifiy')</label>
                                                <div class="col-md-8">
                                                 
                                                 
                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_late_notifiy" type="text"
                                                                   class="form-control @error('n_late_notifiy') is-invalid @enderror"
                                                                   name="n_late_notifiy[]"
                                                                   value="@if (old('n_late_notifiy')){{ old('n_late_notifiy') }}@else{{ $notifications_types['late_notifiy']['tu'] }}@endif"
                                                                   autocomplete="new-n_late_notifiy">
                                                            @error('n_late_notifiy')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_late_notifiy" type="text"
                                                                   class="form-control @error('n_late_notifiy') is-invalid @enderror"
                                                                   name="n_late_notifiy[]"
                                                                   value="@if (old('n_late_notifiy')){{ old('n_late_notifiy') }}@else{{ $notifications_types['late_notifiy']['en'] }}@endif"
                                                                   autocomplete="new-n_late_notifiy">
                                                            @error('n_late_notifiy')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_late_notifiy" type="text"
                                                                   class="form-control @error('n_late_notifiy') is-invalid @enderror"
                                                                   name="n_late_notifiy[]"
                                                                   value="@if (old('n_late_notifiy')){{ old('n_late_notifiy') }}@else{{ $notifications_types['late_notifiy']['ar'] }}@endif"
                                                                   autocomplete="new-n_late_notifiy">
                                                            @error('n_late_notifiy')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.n_order_status')</label>
                                                <div class="col-md-8">



                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_order_status" type="text"
                                                                   class="form-control @error('n_order_status') is-invalid @enderror"
                                                                   name="n_order_status[]"
                                                                   value="@if (old('n_order_status')){{ old('n_order_status') }}@else{{ $notifications_types['order_status']['tu'] }}@endif"
                                                                   autocomplete="new-n_order_status">
                                                            @error('n_order_status')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_order_status" type="text"
                                                                   class="form-control @error('n_order_status') is-invalid @enderror"
                                                                   name="n_order_status[]"
                                                                   value="@if (old('n_order_status')){{ old('n_order_status') }}@else{{ $notifications_types['order_status']['en'] }}@endif"
                                                                   autocomplete="new-n_order_status">
                                                            @error('n_order_status')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                    
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_order_status" type="text"
                                                                   class="form-control @error('n_order_status') is-invalid @enderror"
                                                                   name="n_order_status[]"
                                                                   value="@if (old('n_order_status')){{ old('n_order_status') }}@else{{ $notifications_types['order_status']['ar'] }}@endif"
                                                                   autocomplete="new-n_order_status">
                                                            @error('n_order_status')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.n_new_message')</label>
                                                <div class="col-md-8">
                                                 
                                                 
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_new_message" type="text"
                                                                   class="form-control @error('n_new_message') is-invalid @enderror"
                                                                   name="n_new_message[]"
                                                                   value="@if (old('n_new_message')){{ old('n_new_message') }}@else{{ $notifications_types['new_message']['tu'] }}@endif"
                                                                   autocomplete="new-n_new_message">
                                                            @error('n_new_message')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                          
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_new_message" type="text"
                                                                   class="form-control @error('n_new_message') is-invalid @enderror"
                                                                   name="n_new_message[]"
                                                                   value="@if (old('n_new_message')){{ old('n_new_message') }}@else{{ $notifications_types['new_message']['en'] }}@endif"
                                                                   autocomplete="new-n_new_message">
                                                            @error('n_new_message')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_new_message" type="text"
                                                                   class="form-control @error('n_new_message') is-invalid @enderror"
                                                                   name="n_new_message[]"
                                                                   value="@if (old('n_new_message')){{ old('n_new_message') }}@else{{ $notifications_types['new_message']['ar'] }}@endif"
                                                                   autocomplete="new-n_new_message">
                                                            @error('n_new_message')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>
                                          
                                          
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.n_order_note')</label>
                                                <div class="col-md-8">
                                                    
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_order_note" type="text"
                                                                   class="form-control @error('n_order_note') is-invalid @enderror"
                                                                   name="n_order_note[]"
                                                                   value="@if (old('n_order_note')){{ old('n_order_note') }}@else{{ $notifications_types['order_note']['tu'] }}@endif"
                                                                   autocomplete="new-n_order_note">
                                                            @error('n_order_note')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_order_note" type="text"
                                                                   class="form-control @error('n_order_note') is-invalid @enderror"
                                                                   name="n_order_note[]"
                                                                   value="@if (old('n_order_note')){{ old('n_order_note') }}@else{{ $notifications_types['order_note']['en'] }}@endif"
                                                                   autocomplete="new-n_order_note">
                                                            @error('n_order_note')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_order_note" type="text"
                                                                   class="form-control @error('n_order_note') is-invalid @enderror"
                                                                   name="n_order_note[]"
                                                                   value="@if (old('n_order_note')){{ old('n_order_note') }}@else{{ $notifications_types['order_note']['ar'] }}@endif"
                                                                   autocomplete="new-n_order_note">
                                                            @error('n_order_note')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.n_accept_order_note')</label>
                                                <div class="col-md-8">


                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_accept_order_note" type="text"
                                                                   class="form-control @error('n_accept_order_note') is-invalid @enderror"
                                                                   name="n_accept_order_note[]"
                                                                   value="@if (old('n_accept_order_note')){{ old('n_accept_order_note') }}@else{{ $notifications_types['accept_order_note']['tu'] }}@endif"
                                                                   autocomplete="new-n_accept_order_note">
                                                            @error('n_accept_order_note')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_accept_order_note" type="text"
                                                                   class="form-control @error('n_accept_order_note') is-invalid @enderror"
                                                                   name="n_accept_order_note[]"
                                                                   value="@if (old('n_accept_order_note')){{ old('n_accept_order_note') }}@else{{ $notifications_types['accept_order_note']['en'] }}@endif"
                                                                   autocomplete="new-n_accept_order_note">
                                                            @error('n_accept_order_note')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_accept_order_note" type="text"
                                                                   class="form-control @error('n_accept_order_note') is-invalid @enderror"
                                                                   name="n_accept_order_note[]"
                                                                   value="@if (old('n_accept_order_note')){{ old('n_accept_order_note') }}@else{{ $notifications_types['accept_order_note']['ar'] }}@endif"
                                                                   autocomplete="new-n_accept_order_note">
                                                            @error('n_accept_order_note')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>



                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.n_decline_order_note')</label>
                                                <div class="col-md-8">


                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_decline_order_note" type="text"
                                                                   class="form-control @error('n_decline_order_note') is-invalid @enderror"
                                                                   name="n_decline_order_note[]"
                                                                   value="@if (old('n_decline_order_note')){{ old('n_decline_order_note') }}@else{{ $notifications_types['decline_order_note']['tu'] }}@endif"
                                                                   autocomplete="new-n_decline_order_note">
                                                            @error('n_decline_order_note')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_decline_order_note" type="text"
                                                                   class="form-control @error('n_decline_order_note') is-invalid @enderror"
                                                                   name="n_decline_order_note[]"
                                                                   value="@if (old('n_decline_order_note')){{ old('n_decline_order_note') }}@else{{ $notifications_types['decline_order_note']['en'] }}@endif"
                                                                   autocomplete="new-n_decline_order_note">
                                                            @error('n_decline_order_note')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_decline_order_note" type="text"
                                                                   class="form-control @error('n_decline_order_note') is-invalid @enderror"
                                                                   name="n_decline_order_note[]"
                                                                   value="@if (old('n_decline_order_note')){{ old('n_decline_order_note') }}@else{{ $notifications_types['decline_order_note']['ar'] }}@endif"
                                                                   autocomplete="new-n_decline_order_note">
                                                            @error('n_decline_order_note')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.n_new_offer')</label>
                                                <div class="col-md-8">


                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_new_offer" type="text"
                                                                   class="form-control @error('n_new_offer') is-invalid @enderror"
                                                                   name="n_new_offer[]"
                                                                   value="@if (old('n_new_offer')){{ old('n_new_offer') }}@else{{ $notifications_types['new_offer']['tu'] }}@endif"
                                                                   autocomplete="new-n_new_offer">
                                                            @error('n_new_offer')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_new_offer" type="text"
                                                                   class="form-control @error('n_new_offer') is-invalid @enderror"
                                                                   name="n_new_offer[]"
                                                                   value="@if (old('n_new_offer')){{ old('n_new_offer') }}@else{{ $notifications_types['new_offer']['en'] }}@endif"
                                                                   autocomplete="new-n_new_offer">
                                                            @error('n_new_offer')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_new_offer" type="text"
                                                                   class="form-control @error('n_new_offer') is-invalid @enderror"
                                                                   name="n_new_offer[]"
                                                                   value="@if (old('n_new_offer')){{ old('n_new_offer') }}@else{{ $notifications_types['new_offer']['ar'] }}@endif"
                                                                   autocomplete="new-n_new_offer">
                                                            @error('n_new_offer')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.n_accept_offer')</label>
                                                <div class="col-md-8">


                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_accept_offer" type="text"
                                                                   class="form-control @error('n_accept_offer') is-invalid @enderror"
                                                                   name="n_accept_offer[]"
                                                                   value="@if (old('n_accept_offer')){{ old('n_accept_offer') }}@else{{ $notifications_types['accept_offer']['tu'] }}@endif"
                                                                   autocomplete="new-n_accept_offer">
                                                            @error('n_accept_offer')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_accept_offer" type="text"
                                                                   class="form-control @error('n_accept_offer') is-invalid @enderror"
                                                                   name="n_accept_offer[]"
                                                                   value="@if (old('n_accept_offer')){{ old('n_accept_offer') }}@else{{ $notifications_types['accept_offer']['en'] }}@endif"
                                                                   autocomplete="new-n_accept_offer">
                                                            @error('n_accept_offer')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_accept_offer" type="text"
                                                                   class="form-control @error('n_accept_offer') is-invalid @enderror"
                                                                   name="n_accept_offer[]"
                                                                   value="@if (old('n_accept_offer')){{ old('n_accept_offer') }}@else{{ $notifications_types['accept_offer']['ar'] }}@endif"
                                                                   autocomplete="new-n_accept_offer">
                                                            @error('n_accept_offer')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.n_new_category')</label>
                                                <div class="col-md-8">

                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_new_category" type="text"
                                                                   class="form-control @error('n_new_category') is-invalid @enderror"
                                                                   name="n_new_category[]"
                                                                   value="@if (old('n_new_category')){{ old('n_new_category') }}@else{{ $notifications_types['new_category']['tu'] }}@endif"
                                                                   autocomplete="new-n_new_category">
                                                            @error('n_new_category')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_new_category" type="text"
                                                                   class="form-control @error('n_new_category') is-invalid @enderror"
                                                                   name="n_new_category[]"
                                                                   value="@if (old('n_new_category')){{ old('n_new_category') }}@else{{ $notifications_types['new_category']['en'] }}@endif"
                                                                   autocomplete="new-n_new_category">
                                                            @error('n_new_category')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="n_new_category" type="text"
                                                                   class="form-control @error('n_new_category') is-invalid @enderror"
                                                                   name="n_new_category[]"
                                                                   value="@if (old('n_new_category')){{ old('n_new_category') }}@else{{ $notifications_types['new_category']['ar'] }}@endif"
                                                                   autocomplete="new-n_new_category">
                                                            @error('n_new_category')
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
                                    <h5><i class="ft-inbox"></i>
                                        @lang('admin.order_status_notifications')
                                    </h5>
                                    <div class="row">

                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.order_pending')</label>
                                                <div class="col-md-8">


                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_pending" type="text"
                                                                   class="form-control @error('order_pending') is-invalid @enderror"
                                                                   name="order_pending[]"
                                                                   value="@if (old('order_pending')){{ old('order_pending') }}@else{{ $notifications_types['order_pending']['tu'] }}@endif"
                                                                   autocomplete="new-order_pending">
                                                            @error('order_pending')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_pending" type="text"
                                                                   class="form-control @error('order_pending') is-invalid @enderror"
                                                                   name="order_pending[]"
                                                                   value="@if (old('order_pending')){{ old('order_pending') }}@else{{ $notifications_types['order_pending']['en'] }}@endif"
                                                                   autocomplete="new-order_pending">
                                                            @error('order_pending')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_pending" type="text"
                                                                   class="form-control @error('order_pending') is-invalid @enderror"
                                                                   name="order_pending[]"
                                                                   value="@if (old('order_pending')){{ old('order_pending') }}@else{{ $notifications_types['order_pending']['ar'] }}@endif"
                                                                   autocomplete="new-order_pending">
                                                            @error('order_pending')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.order_accept')</label>
                                                <div class="col-md-8">

                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_accept" type="text"
                                                                   class="form-control @error('order_accept') is-invalid @enderror"
                                                                   name="order_accept[]"
                                                                   value="@if (old('order_accept')){{ old('order_accept') }}@else{{ $notifications_types['order_accept']['tu'] }}@endif"
                                                                   autocomplete="new-order_accept">
                                                            @error('order_accept')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_accept" type="text"
                                                                   class="form-control @error('order_accept') is-invalid @enderror"
                                                                   name="order_accept[]"
                                                                   value="@if (old('order_accept')){{ old('order_accept') }}@else{{ $notifications_types['order_accept']['en'] }}@endif"
                                                                   autocomplete="new-order_accept">
                                                            @error('order_accept')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_accept" type="text"
                                                                   class="form-control @error('order_accept') is-invalid @enderror"
                                                                   name="order_accept[]"
                                                                   value="@if (old('order_accept')){{ old('order_accept') }}@else{{ $notifications_types['order_accept']['ar'] }}@endif"
                                                                   autocomplete="new-order_accept">
                                                            @error('order_accept')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.order_arrive')</label>
                                                <div class="col-md-8">


                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_arrive" type="text"
                                                                   class="form-control @error('order_arrive') is-invalid @enderror"
                                                                   name="order_arrive[]"
                                                                   value="@if (old('order_arrive')){{ old('order_arrive') }}@else{{ $notifications_types['order_arrive']['tu'] }}@endif"
                                                                   autocomplete="new-order_arrive">
                                                            @error('order_arrive')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_arrive" type="text"
                                                                   class="form-control @error('order_arrive') is-invalid @enderror"
                                                                   name="order_arrive[]"
                                                                   value="@if (old('order_arrive')){{ old('order_arrive') }}@else{{ $notifications_types['order_arrive']['en'] }}@endif"
                                                                   autocomplete="new-order_arrive">
                                                            @error('order_arrive')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_arrive" type="text"
                                                                   class="form-control @error('order_arrive') is-invalid @enderror"
                                                                   name="order_arrive[]"
                                                                   value="@if (old('order_arrive')){{ old('order_arrive') }}@else{{ $notifications_types['order_arrive']['ar'] }}@endif"
                                                                   autocomplete="new-order_arrive">
                                                            @error('order_arrive')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.order_paid')</label>
                                                <div class="col-md-8">


                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_paid" type="text"
                                                                   class="form-control @error('order_paid') is-invalid @enderror"
                                                                   name="order_paid[]"
                                                                   value="@if (old('order_paid')){{ old('order_paid') }}@else{{ $notifications_types['order_paid']['tu'] }}@endif"
                                                                   autocomplete="new-order_paid">
                                                            @error('order_paid')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_paid" type="text"
                                                                   class="form-control @error('order_paid') is-invalid @enderror"
                                                                   name="order_paid[]"
                                                                   value="@if (old('order_paid')){{ old('order_paid') }}@else{{ $notifications_types['order_paid']['en'] }}@endif"
                                                                   autocomplete="new-order_paid">
                                                            @error('order_paid')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_paid" type="text"
                                                                   class="form-control @error('order_paid') is-invalid @enderror"
                                                                   name="order_paid[]"
                                                                   value="@if (old('order_paid')){{ old('order_paid') }}@else{{ $notifications_types['order_paid']['ar'] }}@endif"
                                                                   autocomplete="new-order_paid">
                                                            @error('order_paid')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.order_start')</label>
                                                <div class="col-md-8">


                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_start" type="text"
                                                                   class="form-control @error('order_start') is-invalid @enderror"
                                                                   name="order_start[]"
                                                                   value="@if (old('order_start')){{ old('order_start') }}@else{{ $notifications_types['order_start']['tu'] }}@endif"
                                                                   autocomplete="new-order_start">
                                                            @error('order_start')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_start" type="text"
                                                                   class="form-control @error('order_start') is-invalid @enderror"
                                                                   name="order_start[]"
                                                                   value="@if (old('order_start')){{ old('order_start') }}@else{{ $notifications_types['order_start']['en'] }}@endif"
                                                                   autocomplete="new-order_start">
                                                            @error('order_start')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_start" type="text"
                                                                   class="form-control @error('order_start') is-invalid @enderror"
                                                                   name="order_start[]"
                                                                   value="@if (old('order_start')){{ old('order_start') }}@else{{ $notifications_types['order_start']['ar'] }}@endif"
                                                                   autocomplete="new-order_start">
                                                            @error('order_start')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.order_check')</label>
                                                <div class="col-md-8">


                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_check" type="text"
                                                                   class="form-control @error('order_check') is-invalid @enderror"
                                                                   name="order_check[]"
                                                                   value="@if (old('order_check')){{ old('order_check') }}@else{{ $notifications_types['order_check']['tu'] }}@endif"
                                                                   autocomplete="new-order_check">
                                                            @error('order_check')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_check" type="text"
                                                                   class="form-control @error('order_check') is-invalid @enderror"
                                                                   name="order_check[]"
                                                                   value="@if (old('order_check')){{ old('order_check') }}@else{{ $notifications_types['order_check']['en'] }}@endif"
                                                                   autocomplete="new-order_check">
                                                            @error('order_check')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_check" type="text"
                                                                   class="form-control @error('order_check') is-invalid @enderror"
                                                                   name="order_check[]"
                                                                   value="@if (old('order_check')){{ old('order_check') }}@else{{ $notifications_types['order_check']['ar'] }}@endif"
                                                                   autocomplete="new-order_check">
                                                            @error('order_check')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.order_complete')</label>
                                                <div class="col-md-8">


                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_complete" type="text"
                                                                   class="form-control @error('order_complete') is-invalid @enderror"
                                                                   name="order_complete[]"
                                                                   value="@if (old('order_complete')){{ old('order_complete') }}@else{{ $notifications_types['order_complete']['tu'] }}@endif"
                                                                   autocomplete="new-order_complete">
                                                            @error('order_complete')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    
                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_complete" type="text"
                                                                   class="form-control @error('order_complete') is-invalid @enderror"
                                                                   name="order_complete[]"
                                                                   value="@if (old('order_complete')){{ old('order_complete') }}@else{{ $notifications_types['order_complete']['en'] }}@endif"
                                                                   autocomplete="new-order_complete">
                                                            @error('order_complete')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                    
                                                    <fieldset>
                                                        <div class="input-group">

                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_complete" type="text"
                                                                   class="form-control @error('order_complete') is-invalid @enderror"
                                                                   name="order_complete[]"
                                                                   value="@if (old('order_complete')){{ old('order_complete') }}@else{{ $notifications_types['order_complete']['ar'] }}@endif"
                                                                   autocomplete="new-order_complete">
                                                            @error('order_complete')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-4 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.order_cancel')</label>
                                                <div class="col-md-8">


                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Tu</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_cancel" type="text"
                                                                   class="form-control @error('order_cancel') is-invalid @enderror"
                                                                   name="order_cancel[]"
                                                                   value="@if (old('order_cancel')){{ old('order_cancel') }}@else{{ $notifications_types['order_cancel']['tu'] }}@endif"
                                                                   autocomplete="new-order_cancel">
                                                            @error('order_cancel')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">En</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_cancel" type="text"
                                                                   class="form-control @error('order_cancel') is-invalid @enderror"
                                                                   name="order_cancel[]"
                                                                   value="@if (old('order_cancel')){{ old('order_cancel') }}@else{{ $notifications_types['order_cancel']['en'] }}@endif"
                                                                   autocomplete="new-order_cancel">
                                                            @error('order_cancel')
                                                            <span class="invalid-feedback" role="alert">
                                                                    <strong>{{ $message }}</strong>
                                                                </span>
                                                            @enderror
                                                        </div>
                                                    </fieldset>


                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"  style=" width: 47px; "   id="basic-addon3">Ar</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-message-circle"></i></span>
                                                            </div>
                                                            <input id="order_cancel" type="text"
                                                                   class="form-control @error('order_cancel') is-invalid @enderror"
                                                                   name="order_cancel[]"
                                                                   value="@if (old('order_cancel')){{ old('order_cancel') }}@else{{ $notifications_types['order_cancel']['ar'] }}@endif"
                                                                   autocomplete="new-order_cancel">
                                                            @error('order_cancel')
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
                                </div>
                                <div class="form-actions">
                                    <div class="text-right">
                                        <input type="submit" class="btn btn-primary" value="@lang('admin.save')">
                                        <button type="reset" class="btn btn-warning">@lang('admin.delete')
                                            <i class="ft-refresh-cw position-right"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection