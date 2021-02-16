<?php

namespace App\Http\Controllers\API;

use App\Complain;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class ComplainController extends Controller
{
    public function getAllComplains()
    {
        $complains = Complain::where([
            ['user_id', Auth::id()],
            ['active', true],
        ])->get();

        $history = Complain::where([
            ['user_id', Auth::id()],
            ['active', false],
        ])->get();

        return __success([
            'complains' => $complains,
            'history'   => $history,
        ], 200);
    }

    public function pushComplain(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subject' => 'required|string',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return __error($validator->errors()->all()[0], 200);
        }

        $complain = new Complain([
            'subject' => $request->input('subject'),
            'content' => $request->input('content'),
            'user_id' => Auth::id()
        ]);

        $complain->save();

        return $this->getAllComplains();
    }
}
