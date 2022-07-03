<?php

namespace App\Http\Controllers;

use App\Models\KapRemont;
use App\Models\OuterEquipment;
use Illuminate\Http\Request;


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
