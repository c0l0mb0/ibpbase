<?php

namespace App\Http\Controllers;

use App\Models\CpsBuildings;
use Illuminate\Http\Request;

class CpsBuildingsController extends Controller
{
    public function index()
    {
//        $buildings = CpsBuildings::offset(0)->limit(100)->get();

        $buildings = CpsBuildings::all();
        return response()->json($buildings);
    }

    public function create(Request $request)
    {
//        $this->validate($request, [
//            'inner_name' => 'required',
//            'quant' => 'required',
//            'outer_id' => 'required'
//        ]);
        $building = CpsBuildings::create($request->all());

        return response()->json($building);
    }

    public function update($id, Request $request)
    {
        $building = CpsBuildings::find($id);
        $building->update($request->all());
        return response()->json($building);
    }

    public function destroy($id)
    {
        $building = CpsBuildings::find($id);
        $building->delete();

        return response()->json('Building removed successfully');

    }
}
