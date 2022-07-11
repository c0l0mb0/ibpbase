<?php

namespace App\Http\Controllers;

use App\Models\OuterEquipment;
use App\Models\PenRen;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;


class PenRenController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {

        $penRenEntry = PenRen::all();

        return response()->json($penRenEntry);

    }

    public function export()
    {
        return Excel::download(new PenRenExport, 'PenRenExport.xlsx');
    }

    public function indexBuildingOuterPenRen()
    {
        $user = Users::find(Auth::user()->getAuthIdentifier())->role;

        $buildingOuterPenRen = DB::table('outer_equipment')
            ->select(DB::raw('*'))
            ->rightJoin('pen_ren', 'outer_equipment.id', '=', 'pen_ren.outer_id')
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id')
            ->leftJoin('users', 'outer_equipment.role', '=', 'users.role')
            ->where('users.role', $user)
            ->orderBy('outer_equipment.id', 'ASC')
            ->get();
        return response()->json($buildingOuterPenRen);
    }


    public function create(Request $request)
    {
        $this->validate($request, [
            'outer_id' => 'required'
        ]);
        $penRenEntry = PenRen::create($request->all());

        return response()->json($penRenEntry);
    }

    public function showByOuterId($idOuter)
    {
        $penRen = OuterEquipment::find($idOuter)->penRen;
        return response()->json($penRen);
    }

    public function update($id, Request $request)
    {
        $penRenEntry = PenRen::find($id);
        $penRenEntry->update($request->all());
        return response()->json($penRenEntry);
    }

    public function destroy($id)
    {
        $penRenEntry = PenRen::find($id);
        $penRenEntry->delete();

        return response()->json('PenRen removed successfully');
    }


}
