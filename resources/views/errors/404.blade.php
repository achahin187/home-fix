@extends('errors.layout')

@section('title') @lang('app.404_notfound') @endsection

@section('content')
    <div class="card-header bg-transparent border-0">
        <h2 class="error-code text-center mb-2">404</h2>
        <h3 class="text-uppercase text-center">@lang('app.404_notfound')</h3>
    </div>
@endsection
