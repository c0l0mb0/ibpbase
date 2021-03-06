<?php

namespace App\Http\Controllers;

use App\Exports\TehnObslRemontExport;
use App\Models\OuterEquipment;
use App\Models\TehnObslRemont;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;


class TehnObslRemontController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {
        $tehnObslRemontEntry = TehnObslRemont::all();
        return response()->json($tehnObslRemontEntry);
    }

    public function export()
    {
        return Excel::download(new TehnObslRemontExport, 'TehnObslRemontExport.xlsx');
    }

    public function indexBuildingOuterTehnObslRemont()
    {
        $user = Users::find(Auth::user()->getAuthIdentifier())->role;

        $buildingOuterTehnObslRemont = DB::table('outer_equipment')
            ->select(DB::raw('tehn_obsl_remont.id as id,place_first_lev,place_third_lev,equip_name,
            factory_number,state_tech_condition,year_toir,module_toir,module_replacement_name,act,act_link,dv,
            dv_link,vor,vor_link, include_toir_plan,include_toir_plan_link,done_toir_plan,done_toir_plan_link'))
            ->rightJoin('tehn_obsl_remont', 'outer_equipment.id', '=', 'tehn_obsl_remont.outer_id')
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id')
            ->leftJoin('users', 'outer_equipment.role', '=', 'users.role')
            ->where('users.role', $user)
            ->orderBy('outer_equipment.id', 'ASC')
            ->get();
        return response()->json($buildingOuterTehnObslRemont);
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'outer_id' => 'required'
        ]);
        $tehnObslRemontEntry = TehnObslRemont::create($request->all());

        return response()->json($tehnObslRemontEntry);
    }

    public function showByOuterId($idOuter)
    {
        $tehnObslRemont = OuterEquipment::find($idOuter)->tehnObslRemont;
        return response()->json($tehnObslRemont);
    }

    public function update($id, Request $request)
    {
        $tehnObslRemontEntry = TehnObslRemont::find($id);
        $tehnObslRemontEntry->update($request->all());
        return response()->json($tehnObslRemontEntry);
    }

    public function destroy($id)
    {
        $tehnObslRemontEntry = TehnObslRemont::find($id);
        $tehnObslRemontEntry->delete();

        return response()->json('TehnObslRemont removed successfully');
    }


}
