<?php

namespace App\Http\Controllers;

use App\Models\OuterEquipment;
use App\Models\PenRen;
use Illuminate\Http\Request;


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


    public function create(Request $request)
    {
        $this->validate($request, [
            'inner_name' => 'required',
            'quant' => 'required',
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
