<?php

namespace App\Http\Controllers;


use App\Models\Workers;
use Illuminate\Http\Request;


class WorkersController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {

        $workers = Workers::all();

        return response()->json($workers);

    }

    public function create(Request $request)
    {
        $workers = Workers::create($request->all());

        return response()->json($workers);
    }


    public function update($id, Request $request)
    {
        $workers = Workers::find($id);

        $workers->update($request->all());

        return response()->json($workers);
    }

    public function destroy($id)
    {
        $workers = Workers::find($id);
        $workers->delete();

        return response()->json('worker removed successfully');
    }


}
