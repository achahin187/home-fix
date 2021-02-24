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
                        <a href="{{ route('workers.index') }}">
                            {{ __('admin.worker_management')}}
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
                            <form method="POST" action="{{ route('workers.update', $worker->id) }}"
                                  style="text-align: right;"
                                  enctype="multipart/form-data">
                                @csrf
                                {{method_field('PUT')}}
                                <div class="form-body">
                                    <h4 class="form-section"><i class="ft-user"></i>
                                        @lang('admin.worker_info')
                                    </h4>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.name')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-user"></i></span>
                                                            </div>
                                                            <input id="name" type="text"
                                                                   class="form-control @error('name') is-invalid @enderror"
                                                                   name="name"
                                                                   value="@if(old('name')){{old('name')}}@else{{$worker->name}}@endif"
                                                                   required
                                                                   autocomplete="name">
                                                            @error('name')
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
                                                       style="padding: 0.75rem 1rem;">@lang('admin.email')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-mail"></i></span>
                                                            </div>
                                                            <input id="email" type="email"
                                                                   class="form-control @error('email') is-invalid @enderror"
                                                                   name="email"
                                                                   value="@if(old('email')){{old('email')}}@else{{$worker->email}}@endif"
                                                                   required
                                                                   autocomplete="email">

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
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.phone')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-phone"></i></span>
                                                            </div>
                                                            <input id="phone" type="text"
                                                                   class="form-control @error('phone') is-invalid @enderror"
                                                                   name="phone"
                                                                   value="@if(old('phone')){{old('phone')}}@else{{$worker->phone}}@endif"
                                                                   required
                                                                   autocomplete="phone">
                                                            @error('phone')
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
                                                       style="padding: 0.75rem 1rem;">@lang('admin.image')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-image"></i></span>
                                                            </div>
                                                            <input id="image" type="file"
                                                                   class="form-control @error('image') is-invalid @enderror"
                                                                   name="image">
                                                            @error('image')
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
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.password')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-lock"></i></span>
                                                            </div>
                                                            <input id="password" type="password"
                                                                   class="form-control @error('password') is-invalid @enderror"
                                                                   name="password" value="{{ old('password') }}"
                                                                   autocomplete="new-password">
                                                            @error('password')
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
                                                       style="padding: 0.75rem 1rem;">@lang('admin.password_confirmation')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-lock"></i></span>
                                                            </div>
                                                            <input id="password_confirmation" type="password"
                                                                   class="form-control @error('password_confirmation') is-invalid @enderror"
                                                                   name="password_confirmation"
                                                                   value="{{ old('password_confirmation') }}"
                                                                   autocomplete="new-password">
                                                            @error('password_confirmation')
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
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.the_country')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-envelope"></i></span>
                                                            </div>
                                                            <select name="country" id="country_selector"
                                                                    class="form-control @error('country') is-invalid @enderror">
                                                                @foreach ($countries as $country)
                                                                    <option
                                                                        @if (old('country'))
                                                                        @if (old('country') == $country->id)
                                                                        selected="selected"
                                                                        @endif
                                                                        @else
                                                                        @if ($worker->user_address['country'] == $country->name)
                                                                        selected="selected"
                                                                        @endif
                                                                        @endif
                                                                        value="{{ $country->id }}">
                                                                        {{ $country->name }}
                                                                    </option>
                                                                @endforeach
                                                            </select>
                                                            @error('country')
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
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.the_city')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-envelope"></i></span>
                                                            </div>
                                                            <select name="city" id="city_selector"
                                                                    class="form-control @error('city') is-invalid @enderror">
                                                            </select>
                                                            @error('city')
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
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.address')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="la la-envelope"></i></span>
                                                            </div>
                                                            <input type="text" id="pac-input" required
                                                                   autocomplete="address"
                                                                   class="form-control @error('address') is-invalid @enderror"
                                                                   value="@if(old('address')){{old('address')}}@else{{$worker->address}}@endif"
                                                                   name="address">
                                                            @error('address')
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
                                                       style="padding: 0.75rem 1rem;">
                                                    @lang('admin.the_category')</label>
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
                                                                class="selectpicker form-control
                                                                        @error('category') is-invalid @enderror"
                                                                        name="category[]"
                                                                        title="@lang('admin.select_category')"
                                                                        multiple data-actions-box="true">
                                                                    @foreach($categories as $category)
                                                                        <option
                                                                            @if (search_assoc($category->id, $worker->category->toArray()))
                                                                            selected="selected"
                                                                            @endif
                                                                            value="{{ $category->id }}">
                                                                            {{ $category->name }}
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
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.active_status')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-check-circle"></i></span>
                                                            </div>
                                                            <select name="verified" class="form-control">
                                                                <option value="1" @if ($worker->verified == 1)
                                                                selected="selected"
                                                                    @endif>@lang('admin.verified')</option>
                                                                <option value="0" @if ($worker->verified == 0)
                                                                selected="selected"
                                                                    @endif>@lang('admin.un_verified')</option>
                                                            </select>
                                                            @error('verified')
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
                                                       style="padding: 0.75rem 1rem;">@lang('admin.ban_status')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-check-circle"></i></span>
                                                            </div>
                                                            <select name="ban" class="form-control">
                                                                <option value="1" @if ($worker->ban == 1)
                                                                selected="selected"
                                                                    @endif>@lang('admin.ban')</option>
                                                                <option value="0" @if ($worker->ban == 0)
                                                                selected="selected"
                                                                    @endif>@lang('admin.un_ban')</option>
                                                            </select>
                                                            @error('ban')
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
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-md-3 label-control"
                                                       style="padding: 0.75rem 1rem;">@lang('admin.cv')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-user"></i></span>
                                                            </div>
                                                            <input id="cv" type="file"
                                                                   class="form-control @error('cv') is-invalid @enderror"
                                                                   name="cv">
                                                            @error('cv')
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
                                                       style="padding: 0.75rem 1rem;">@lang('admin.identity')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon3"><i
                                                                        class="ft-user"></i></span>
                                                            </div>
                                                            <input id="identity" type="file"
                                                                   class="form-control @error('identity') is-invalid @enderror"
                                                                   name="identity">
                                                            @error('identity')
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
                                                       style="padding: 0.75rem 1rem;">@lang('admin.badge')</label>
                                                <div class="col-md-9">
                                                    <fieldset>
                                                        <div class="input-group" style="padding: 5%;">
                                                            <input id="badge" {{ $worker->badge == 1 ? 'checked' : '' }}
                                                                type="checkbox" value="1" name="badge">
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
