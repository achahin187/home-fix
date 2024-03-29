@extends('auth.layouts.auth')

@section('title')
    {{ config('app.name') }} | @lang('admin.login')
@endsection

@section('form.title')
    @lang('admin.login')
@endsection

@section('content')
    @if (isset($error))
        <div class="alert bs-callout-danger callout-border-left">
            <button type="button" class="close" data-dismiss="alert">×</button>
            <strong>{{ $error }}</strong>
        </div>
    @endif
    <form method="POST" action="{{ route('login') }}" style="text-align: right;">
        @csrf
        <div class="form-group row position-relative has-icon-left mb-0">
            <label for="email" class="col-md-4 col-form-label text-md-left">@lang('admin.email')</label>
            <div class="col-md-8">
                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email"
                       value="{{ old('email') }}" required autocomplete="email" autofocus>

                @error('email')
                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                @enderror
                <div class="form-control-position">
                    <i class="ft-user"></i>
                </div>
            </div>
        </div>
        <br>
        <div class="form-group row position-relative has-icon-left">
            <label for="password" class="col-md-4 col-form-label text-md-left">@lang('admin.password')</label>
            <div class="col-md-8">
                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror"
                       name="password" required autocomplete="current-password">

                @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
                <div class="form-control-position">
                    <i class="la la-key"></i>
                </div>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-md-6">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="remember"
                           id="remember" {{ old('remember') ? 'checked' : '' }}>

                    <label class="form-check-label" for="remember">
                        @lang('admin.remember_me')
                    </label>
                </div>
            </div>
            <div class="col-md-6 col-12 text-center text-md-right">
                <a href="{{ route('password.request') }}" class="card-link">@lang('admin.reset_password')؟</a>
            </div>
        </div>
        <button type="submit"
                class="btn btn-info btn-lg btn-block text-sm-center">
            <i class="ft-unlock"></i> @lang('admin.login')
        </button>
    </form>
@endsection
