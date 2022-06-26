<?php

namespace App\Http\Controllers;

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

        $PenRenEntry = PenRen::all();

        return response()->json($PenRenEntry);

    }


    public function create(Request $request)
    {
        $this->validate($request, [
            'inner_name' => 'required',
            'quant' => 'required',
            'id_outer' => 'required'
        ]);
        $PenRenEntry = PenRen::create($request->all());

        return response()->json($PenRenEntry);
    }

    public function show($id)
    {
        $PenRenEntry = PenRen::find($id);
        return response()->json($PenRenEntry);
    }

    public function update($id, Request $request)
    {
        $PenRenEntry = PenRen::find($id);
        $PenRenEntry->update($request->all());
        return response()->json($PenRenEntry);
    }

    public function destroy($id)
    {
        $PenRenEntry = PenRen::find($id);
        $PenRenEntry->delete();

        return response()->json('PenRen removed successfully');
    }


}
