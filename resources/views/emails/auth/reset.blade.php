@component('mail::message')
# Introduction
Home Fix Reset Password.
<p>Hello</p>

<p>Your new password is : {{$new_password}}</p>


Thanks,<br>
{{ config('app.name') }}
@endcomponent
