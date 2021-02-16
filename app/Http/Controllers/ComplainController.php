<?php

namespace App\Http\Controllers;

use App\Complain;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ComplainController extends Controller
{
    protected $mainTitle;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin|manager']);
        $this->mainTitle = trans('admin.complain_management');
    }

    /**
     * Display a listing of the complain.
     *
     * @return Response
     */
    public function index()
    {
        $complains = Complain::with('author')->get();

        return view('complains.list', [
            'mainTitle' => $this->mainTitle,
            'title'     => $this->mainTitle,
            'complains' => $complains,
        ]);
    }

    /**
     * Show the form for creating a new complain.
     *
     * @return Response
     */
    public function create()
    {
        return abort(404);
    }

    /**
     * Store a newly created complain in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        return abort(404);
    }

    /**
     * Display the specified complain.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $complain = Complain::where('id', $id)
            ->with('author')->first();

        if (!$complain) {
            return $this->_404(
                trans('admin.complain_not_found'),
                $this->mainTitle,
                'complains.index'
            );
        }

        return view('complains.view', [
            'complain'  => $complain,
            'mainTitle' => $this->mainTitle,
            'title'     => trans('admin.view_complain') .
                ' ( ' . $complain->id . ' )',
        ]);
    }

    /**
     * Show the form for editing the specified complain.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        return abort(404);
    }

    /**
     * Update the specified complain in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        return abort(404);
    }

    /**
     * Remove the specified complain from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        if (Complain::find($id)->delete()) {
            return response()->json('success', 200);
        }
        return response()->json('error', 200);
    }

    /**
     * Change the specified complain active.
     *
     * @param int $id
     * @return Response
     */
    public function active($id)
    {
        $complain = Complain::where(
            'id', $id
        )->first();

        $complain->active = !$complain->active;

        if ($complain->save()) {
            return response()->json('success', 200);
        }
        return response()->json('error', 200);
    }
}
