<?php

namespace App\Http\Controllers;

use App\Models\KapRemont;
use App\Models\OuterEquipment;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class KapRemontController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {

        $kapRemontEntry = KapRemont::all();

        return response()->json($kapRemontEntry);

    }

    public function indexBuildingOuterKapRemont()
    {
        $user = Users::find(Auth::user()->getAuthIdentifier())->role;

        $buildingKapRemontOuterEquipments = DB::table('outer_equipment')
            ->select(DB::raw('*'))
            ->rightJoin('kap_remont', 'outer_equipment.id', '=', 'kap_remont.outer_id')
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id')
            ->leftJoin('users', 'outer_equipment.role', '=', 'users.role')
            ->where('users.role', $user)
            ->orderBy('outer_equipment.id', 'ASC')
            ->get();
        return response()->json($buildingKapRemontOuterEquipments);
    }


    public function create(Request $request)
    {
        $this->validate($request, [
            'outer_id' => 'required'
        ]);
        $kapRemontEntry = KapRemont::create($request->all());

        return response()->json($kapRemontEntry);
    }

    public function showByOuterId($idOuter)
    {
        $kapRemontEntry = OuterEquipment::find($idOuter)->kapRemont;
        return response()->json($kapRemontEntry);
    }

    public function update($id, Request $request)
    {
        $kapRemontEntry = KapRemont::find($id);
        $kapRemontEntry->update($request->all());
        return response()->json($kapRemontEntry);
    }

    public function destroy($id)
    {
        $kapRemontEntry = KapRemont::find($id);
        $kapRemontEntry->delete();

        return response()->json('KapRemont removed successfully');
    }


}
