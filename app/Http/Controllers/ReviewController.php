<?php

namespace App\Http\Controllers;

use App\Review;
use Avatar;
use File;
use Illuminate\Http\Response;
use Storage;


class ReviewController extends Controller
{
    protected $mainTitle;

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth', 'role:super-admin|admin|manager']);
        $this->mainTitle = trans('admin.review_management');
    }

    /**
     * Display a listing of the review.
     *
     * @return Response
     */
    public function index($role = null)
    {
        if (in_array($role, ['worker', 'client'])) {
            $reviews = Review::with([
                'user' => function ($q) use ($role) {
                    $q->where('role', $role);
                }
            ])->get();

            $title = $role . '_review_management';

            return view('reviews.list', [
                'mainTitle' => $this->mainTitle,
                'title'     => trans('admin.' . $title),
                'reviews'   => $reviews,
                'role'      => $role,
            ]);
        }
        return view('reviews.list', [
            'mainTitle' => $this->mainTitle,
            'title'     => $this->mainTitle,
            'role'      => null,
        ]);
    }

    /**
     * Remove the specified review from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        if (review::find($id)->delete()) {
            return response()->json("success", 200);
        }
    }
}
