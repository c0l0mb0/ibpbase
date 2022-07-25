<?php

namespace App\Http\Controllers;

use App\Models\Users;
use App\Models\ZipEquipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class ZipEquipmentController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {
        $zipEquipmentAllEntries = DB::table('zip_equipment')
            ->select(DB::raw('zip_equipment.id as id, equip_name, quantity'))
            ->where('zip_equipment.role', $this->getUserRole())
            ->get();

        return response()->json($zipEquipmentAllEntries);
    }


    public function create(Request $request)
    {
        $this->validate($request, [
            'equip_name' => 'required',
            'quantity' => 'required|numeric'
        ]);
        if (ZipEquipment::where('equip_name', $request->equip_name)->exists()) {
            return response()->json('already exists', 409);
        }
        $requestArray = $request->all();
        $requestArray['role'] = $this->getUserRole();

        $zipEquipmentEntry = ZipEquipment::create($requestArray);

        return response()->json($zipEquipmentEntry);
    }

    public function show($id)
    {
        $zipEquipmentEntry = ZipEquipment::find($id);
        return response()->json($zipEquipmentEntry);
    }

    public function update($id, Request $request)
    {
        $zipEquipmentEntry = ZipEquipment::find($id);
        $zipEquipmentEntry->update($request->all());
        return response()->json($zipEquipmentEntry);
    }

    public function destroy($id)
    {
        $zipEquipmentEntry = ZipEquipment::find($id);
        $zipEquipmentEntry->delete();

        return response()->json('ZipEquipment removed successfully');
    }

    private function getUserRole()
    {
        $userId = Auth::user()->getAuthIdentifier();
        $user = Users::find($userId);
        return $user->role;
    }


}
