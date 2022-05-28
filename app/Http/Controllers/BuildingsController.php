<?php

namespace App\Http\Controllers;

use App\Buildings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class BuildingsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {

        $buildings = Buildings::all();

        return response()->json($buildings);

    }

    public function listOfObjects()
    {
        $place_first_lev = DB::table('buildings')
            ->select('place_first_lev')
            ->distinct()
            ->get();
        return response()->json($place_first_lev);

    }


    public function create(Request $request)
    {
        $buildings = Buildings::create($request->all());

        return response()->json($buildings);
    }

    public function show($id)
    {
        $buildings = Buildings::find($id);

        return response()->json($buildings);
    }

    public function update($id, Request $request )
    {
        $buildings= Buildings::find($id);

        $buildings->update($request->all());

        return response()->json($buildings);
    }

    public function destroy($id)
    {
        $buildings = Buildings::find($id);
        $buildings->delete();

        return response()->json('Buildings removed successfully');
    }


}
