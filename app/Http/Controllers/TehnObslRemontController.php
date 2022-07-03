<?php

namespace App\Http\Controllers;

use App\Models\OuterEquipment;
use App\Models\TehnObslRemont;
use Illuminate\Http\Request;


class TehnObslRemontController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {

        $tehnObslRemontEntry = TehnObslRemont::all();

        return response()->json($tehnObslRemontEntry);

    }


    public function create(Request $request)
    {
        $this->validate($request, [
            'outer_id' => 'required'
        ]);
        $tehnObslRemontEntry = TehnObslRemont::create($request->all());

        return response()->json($tehnObslRemontEntry);
    }

    public function showByOuterId($idOuter)
    {
        $tehnObslRemont = OuterEquipment::find($idOuter)->tehnObslRemont;
        return response()->json($tehnObslRemont);
    }

    public function update($id, Request $request)
    {
        $tehnObslRemontEntry = TehnObslRemont::find($id);
        $tehnObslRemontEntry->update($request->all());
        return response()->json($tehnObslRemontEntry);
    }

    public function destroy($id)
    {
        $tehnObslRemontEntry = TehnObslRemont::find($id);
        $tehnObslRemontEntry->delete();

        return response()->json('TehnObslRemont removed successfully');
    }


}
