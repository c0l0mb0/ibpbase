<?php

namespace App\Http\Controllers;


use App\Models\FireInstr;
use Illuminate\Http\Request;


class FireInstrController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {

        $fireInstr = FireInstr::all();

        return response()->json($fireInstr);

    }

    public function create(Request $request)
    {
        $fireInstr = FireInstr::create($request->all());

        return response()->json($fireInstr);
    }



    public function update($id, Request $request )
    {
        $fireInstr= FireInstr::find($id);

        $fireInstr->update($request->all());

        return response()->json($fireInstr);
    }

    public function destroy($id)
    {
        $fireInstr = FireInstr::find($id);
        $fireInstr->delete();

        return response()->json('FireInstr removed successfully');
    }


}
