<?php

namespace App\Http\Controllers;

use App\Models\Tro;
use Illuminate\Http\Request;


class TroController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {

        $TroEntry = Tro::all();

        return response()->json($TroEntry);

    }


    public function create(Request $request)
    {
        $this->validate($request, [
            'inner_name' => 'required',
            'quant' => 'required',
            'id_outer' => 'required'
        ]);
        $TroEntry = Tro::create($request->all());

        return response()->json($TroEntry);
    }

    public function show($id)
    {
        $TroEntry = Tro::find($id);
        return response()->json($TroEntry);
    }

    public function update($id, Request $request)
    {
        $TroEntry = Tro::find($id);
        $TroEntry->update($request->all());
        return response()->json($TroEntry);
    }

    public function destroy($id)
    {
        $TroEntry = Tro::find($id);
        $TroEntry->delete();

        return response()->json('Tro removed successfully');
    }


}
