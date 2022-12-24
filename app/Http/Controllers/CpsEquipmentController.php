<?php

namespace App\Http\Controllers;


use App\Models\CpsEquipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class CpsEquipmentController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {

        $equipment = CpsEquipment::all();
        return response()->json($equipment);

    }

    public function create(Request $request)
    {
//        $this->validate($request, [
//            'inner_name' => 'required',
//            'quant' => 'required',
//            'outer_id' => 'required'
//        ]);
        $equipment = CpsEquipment::create($request->all());

        return response()->json($equipment);
    }

    public function update($id, Request $request)
    {
        $equipment = CpsEquipment::find($id);
        $equipment->update($request->all());
        return response()->json($equipment);
    }

    public function destroy($id)
    {
        $equipment = CpsEquipment::find($id);
        $equipment->delete();

        return response()->json('Equipment removed successfully');
    }



}
