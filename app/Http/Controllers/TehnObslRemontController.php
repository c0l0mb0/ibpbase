<?php

namespace App\Http\Controllers;

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
            'inner_name' => 'required',
            'quant' => 'required',
            'id_outer' => 'required'
        ]);
        $tehnObslRemontEntry = TehnObslRemont::create($request->all());

        return response()->json($tehnObslRemontEntry);
    }

    public function show($id)
    {
        $tehnObslRemontEntry = TehnObslRemont::find($id);
        return response()->json($tehnObslRemontEntry);
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
