@extends('auth.layouts.auth')

@section('title')
    {{ config('app.name') }} | @lang('admin.reset_password')
@endsection

@section('form.title')
    @lang('admin.reset_password')
@endsection

@section('content')
    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <div class="form-group row">
            <label for="email"
                   class="col-md-4 col-form-label text-md-right">@lang('admin.email')</label>

            <div class="col-md-8">
                <input id="email" type="email"
                       class="form-control @error('email') is-invalid @enderror" name="email"
                       value="{{ old('email') }}" required autocomplete="email" autofocus>

                @error('email')
                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                @enderror
            </div>
        </div>

        <div class="form-group row mb-0">
            <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-primary">
                    @lang('admin.send_password')
                </button>
            </div>
        </div>
    </form>
@endsection
