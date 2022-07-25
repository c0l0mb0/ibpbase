<?php

namespace App\Http\Controllers;

use App\Exports\TroExport;
use App\Models\OuterEquipment;
use App\Models\Tro;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class TroController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {

        $troEntry = Tro::all();

        return response()->json($troEntry);

    }

    public function indexBuildingOuterTro()
    {
        $user = Users::find(Auth::user()->getAuthIdentifier())->role;

        $buildingOuterTro = DB::table('outer_equipment')
            ->select(DB::raw('place_first_lev, place_third_lev, equip_name,factory_number,
            state_tech_condition,act_number,act_number_link,act_date,equipment_name,act_content,
            fault_reason,equipment_state'))
            ->rightJoin('tro', 'outer_equipment.id', '=', 'tro.outer_id')
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id')
            ->leftJoin('users', 'outer_equipment.role', '=', 'users.role')
            ->where('users.role', $user)
            ->orderBy('outer_equipment.id', 'ASC')
            ->get();
        return response()->json($buildingOuterTro);
    }
    public function export()
    {
        return Excel::download(new TroExport, 'TroExport.xlsx');
    }



    public function create(Request $request)
    {
        $this->validate($request, [
            'outer_id' => 'required'
        ]);
        $troEntry = Tro::create($request->all());

        return response()->json($troEntry);
    }

    public function showByOuterId($idOuter)
    {
        $tro = OuterEquipment::find($idOuter)->tro;
        return response()->json($tro);
    }

    public function update($id, Request $request)
    {
        $troEntry = Tro::find($id);
        $troEntry->update($request->all());
        return response()->json($troEntry);
    }

    public function destroy($id)
    {
        $troEntry = Tro::find($id);
        $troEntry->delete();

        return response()->json('Tro removed successfully');
    }


}
