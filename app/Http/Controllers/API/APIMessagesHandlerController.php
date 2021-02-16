<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Carbon\Carbon;

class APIMessagesHandlerController extends Controller
{
    public static function error($message, $status)
    {
        return response()->json([
            'type'    => 'error',
            'message' => $message,
        ], $status);
    }

    public static function success($data, $status)
    {
        return response()->json([
            'type' => 'success',
            'data' => $data
        ], $status);
    }
}
