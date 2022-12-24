<?php

namespace App\Http\Controllers;

use App\Models\CpsObjApp;
use App\Models\ListStates;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CpsObjAppController extends Controller
{
    public function index($id)
    {

        $objectAndEquip = DB::table('cps_obj_app')
            ->select(DB::raw('cps_obj_app.id as id,app_name, quantity,measure, app_year'))
            ->leftJoin('cps_equipment', 'cps_equipment.id', '=', 'cps_obj_app.id_app')
            ->leftJoin('cps_buildings', 'cps_buildings.id', '=', 'cps_obj_app.id_obj')
            ->where('cps_buildings.id', $id)
            ->orderBy('id', 'asc')
            ->get();
        return response()->json($objectAndEquip);

    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'id_obj' => 'required',
            'id_app' => 'required',
            'quantity' => 'required',
            'measure' => 'required'
        ]);
        $equipment = CpsObjApp::create($request->all());

        return response()->json($equipment);
    }

    public function update($id, Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'quantity' => 'required',
        ]);

        $objectAndEquip = CpsObjApp::find($id);
        $objectAndEquip->update($request->all());
        return response()->json($objectAndEquip);
    }

    public function destroy($id)
    {

        $equipment = CpsObjApp::find($id);
        $equipment->delete();

        return response()->json('Equipment in building removed successfully');
    }

}
