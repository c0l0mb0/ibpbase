<?php

namespace App\Http\Controllers;

use App\Models\OuterEquipment;
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

        $troEntry = Tro::all();

        return response()->json($troEntry);

    }


    public function create(Request $request)
    {
        $this->validate($request, [
            'outer_id' => 'required'
        ]);
        $troEntry = Tro::create($request->all());

        return response()->json($troEntry);
    }

    public function showByOuterId($idOuter)
    {
        $tro = OuterEquipment::find($idOuter)->tro;
        return response()->json($tro);
    }

    public function update($id, Request $request)
    {
        $troEntry = Tro::find($id);
        $troEntry->update($request->all());
        return response()->json($troEntry);
    }

    public function destroy($id)
    {
        $troEntry = Tro::find($id);
        $troEntry->delete();

        return response()->json('Tro removed successfully');
    }


}
