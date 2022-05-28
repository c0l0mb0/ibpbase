<?php

namespace App\Http\Controllers;

use App\InnerEquipment;
use App\OuterEquipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class InnerEquipmentController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {

        $innerEquipments = InnerEquipment::all();

        return response()->json($innerEquipments);

    }


    public function create(Request $request)
    {
        $this->validate($request, [
            'inner_name' => 'required',
            'quant' => 'required',
            'id_outer' => 'required'
        ]);
        $innerEquipments = InnerEquipment::create($request->all());

        return response()->json($innerEquipments);
    }

    public function show($id)
    {
        $innerEquipments = InnerEquipment::find($id);
        return response()->json($innerEquipments);
    }

    public function update($id, Request $request )
    {
        $innerEquipments= InnerEquipment::find($id);
        $innerEquipments->update($request->all());
        return response()->json($innerEquipments);
    }

    public function destroy($id)
    {
        $innerEquipments = InnerEquipment::find($id);
        $innerEquipments->delete();

        return response()->json('InnerEquipment removed successfully');
    }


}
