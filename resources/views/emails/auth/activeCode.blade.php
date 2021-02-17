@component('mail::message')
# Introduction
Home Fix Active Code.
<p>Hello {{$user->name}}</p>

<p>Your activation code is : {{$user->activation_key}}</p>


Thanks,<br>
{{ config('app.name') }}
@endcomponent
