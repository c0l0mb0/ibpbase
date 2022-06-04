<?php

namespace App\Http\Controllers;

use App\Models\Buildings;
use App\Models\ListLocations;
use App\Models\OuterEquipment;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OuterEquipmentController extends Controller
{


    /**
     * Create a new controller instance.
     *
     * @return void
     */


    public function indexBuildingOuterByListLocationId($id)
    {
        $locationFromLocationList = ListLocations::find($id)->location;
        $outerEquipment = DB::table('outer_equipment')
            ->select(DB::raw('*'))
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id_build')
            ->leftJoin('users', 'outer_equipment.role', '=', 'users.role')
            ->where('users.role', $this->getUserRole())
            ->where('buildings.place_first_lev', $locationFromLocationList)
            ->orderBy('id_outer_equip', 'ASC')
            ->get();
        return $outerEquipment;
    }

    public function index(Request $request)
    {
        $outerEquipments = OuterEquipment::all()
            ->sortBy("id_outer_equip");
        return response()->json($outerEquipments);
    }

    public function indexBuildingOuterInner()
    {
        $outerEquipment = DB::table('outer_equipment')
            ->select(DB::raw('*'))
            ->leftJoin('inner_equipment', 'outer_equipment.id_outer_equip', '=', 'inner_equipment.id_outer')
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id_build')
            ->where('users.role', $this->getUserRole())
            ->orderBy('id_outer_equip', 'ASC')
            ->get();
        return response()->json($outerEquipment);
    }

    public function indexBuildingOuter()
    {

        $outerEquipment = DB::table('outer_equipment')
            ->select(DB::raw('*'))
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id_build')
            ->leftJoin('users', 'outer_equipment.role', '=', 'users.role')
            ->where('users.role', $this->getUserRole())
            ->orderBy('id_outer_equip', 'ASC')
            ->get();
        return $outerEquipment;
    }

    public function showInnerByOuterId($idOuter)
    {
        $innerEquipments = OuterEquipment::find($idOuter)->innerEquip;
        return response()->json($innerEquipments);
    }


    public function create(Request $request)
    {
        $this->validate($request, [
            'factory_number' => 'required',
            'equip_name' => 'required'
        ]);

        $outerEquipment = OuterEquipment::create($request->all());

        return response()->json($outerEquipment);
    }

    private function getUserRole()
    {
        $userId = Auth::user()->getAuthIdentifier();
        $user = Users::find($userId);
        return $user->role;
    }

    public function createWithLocation(Request $request)
    {
        $this->validate($request, [
            'factory_number' => 'required',
            'equip_name' => 'required',
            'place_first_lev' => 'required',
            'place_third_lev' => 'required'
        ]);

        if (OuterEquipment::where('factory_number', $request->factory_number)->exists()) {
            return ('factory_number already exists');
        }
        $building = new Buildings;
        $building->place_first_lev = $request->place_first_lev;
        $building->place_third_lev = $request->place_third_lev;
        $building->place_zero_lev = $request->place_zero_lev;
        $building->save();

        $requestArray = $request->all();
        $requestArray['id_build'] = $building->id_build;
        $requestArray['role'] = $this->getUserRole();
        OuterEquipment::create($requestArray);
        return response()->json('equipment added successfully');
    }

    public function show($id)
    {
        $outerEquipment = OuterEquipment::find($id)
            ->where('users.role', $this->getUserRole());

        return response()->json($outerEquipment);
    }

    public function update($id, Request $request)
    {
        $this->validate($request, [
            'factory_number' => 'required'
        ]);

        $outerEquipment = OuterEquipment::find($id);

        $outerEquipment->update($request->all());

        return response()->json($outerEquipment);
    }

    public function destroy($id)
    {
        $outerEquipment = OuterEquipment::find($id);
        $outerEquipment->delete();

        return response()->json('OuterEquipment removed successfully');
    }

    public function destroyOuterEquipAndItsLocation($id)
    {
        $outerEquipment = OuterEquipment::find($id);
        $outerEquipment->delete();
        $building = Buildings::find($outerEquipment->id_build);
        $building->delete();
        return response()->json('OuterEquipment removed successfully');
    }
}
