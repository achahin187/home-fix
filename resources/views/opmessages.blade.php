<?php use Illuminate\Support\Facades\Session; ?>

@if (Session::has('success'))
    <div class="alert bs-callout-success callout-border-left">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <strong>{{ session('success') }}</strong>
    </div>
    <?php Session::forget('success'); ?>
@endif


@if (Session::has('error'))
    <div class="alert bs-callout-danger callout-border-left">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <strong>{{ session('error') }}</strong>
    </div>
    <?php Session::forget('error'); ?>
@endif


@if (Session::has('warning'))
    <div class="alert bs-callout-warning callout-border-left">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <strong>{{ session('warning') }}</strong>
    </div>
    <?php Session::forget('warning'); ?>
@endif


@if (Session::has('info'))
    <div class="alert bs-callout-info callout-border-left">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <strong>{{ session('info') }}</strong>
    </div>
    <?php Session::forget('info'); ?>
@endif
