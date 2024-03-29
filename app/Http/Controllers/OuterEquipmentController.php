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
            ->select(DB::raw('outer_equipment.id as id, place_first_lev, place_third_lev,equip_name,factory_number,factory_name,
            inventory_number,affiliate,numb_vvod,purpose,year_issue_date,year_exploitation_date,power,current,
            has_zip,state_tech_condition '))
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id')
            ->leftJoin('users', 'outer_equipment.role', '=', 'users.role')
            ->where('users.role', $this->getUserRole())
            ->where('buildings.place_first_lev', $locationFromLocationList)
            ->orderBy('outer_equipment.id', 'ASC')
            ->get();
        return $outerEquipment;
    }

    public function index(Request $request)
    {
        $outerEquipments = OuterEquipment::all()
            ->sortBy("id");
        return response()->json($outerEquipments);
    }

    public function indexBuildingOuterInner()
    {
        $outerEquipment = DB::table('outer_equipment')
            ->select(DB::raw('outer_equipment.id as id, place_third_lev,equip_name,factory_number,factory_name,
            inventory_number,affiliate,numb_vvod,purpose,year_issue_date,year_exploitation_date,power,
            current,has_zip,state_tech_condition '))
            ->leftJoin('inner_equipment', 'outer_equipment.id', '=', 'inner_equipment.outer_id')
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id')
            ->where('users.role', $this->getUserRole())
            ->orderBy('outer_equipment.id', 'ASC')
            ->get();
        return response()->json($outerEquipment);
    }

    public function indexBuildingOuter()
    {
        $outerEquipment = DB::table('outer_equipment')
            ->select(DB::raw('outer_equipment.id as id,place_first_lev, place_third_lev,equip_name,factory_number,factory_name,
            inventory_number,affiliate,numb_vvod,purpose,year_issue_date,year_exploitation_date,power,current,
            has_zip,state_tech_condition'))
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id')
            ->leftJoin('users', 'outer_equipment.role', '=', 'users.role')
            ->where('users.role', $this->getUserRole())
            ->orderBy('id', 'asc')
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
            return response()->json('factory_number already exists', 409);
        }
        $building = new Buildings;
        $building->place_first_lev = $request->place_first_lev;
        $building->place_third_lev = $request->place_third_lev;
        $building->save();

        $requestArray = $request->all();
        $requestArray['id_build'] = $building->id;
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
            'factory_number' => 'required',
            'id' => 'required',
            'place_first_lev' => 'required',
        ]);
        $outerEquipment = OuterEquipment::find($id);

        $building = Buildings::find($outerEquipment->id_build);

        $outerEquipment->update($request->all());
        $building->place_first_lev = $request->place_first_lev;
        $building->place_third_lev = $request->place_third_lev;
        $building->save();
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
