<?php

namespace App\Http\Controllers;

use App\Models\ListLocations;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class ListLocationsController extends Controller
{
    public function index()
    {
        $userId = Auth::user()->getAuthIdentifier();
        $user = Users::find($userId);

        $listLocations = DB::table('list_locations')
            ->select(DB::raw('*'))
            ->where('role', $user->role)
            ->orderBy('id', 'ASC')
            ->get();

        return response()->json($listLocations);

    }
}
