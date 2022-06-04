<?php

namespace App\Http\Controllers;

use App\Models\ListStates;
use Illuminate\Http\Request;

class ListStatesController extends Controller
{
    public function index()
    {

        $listStates = ListStates::all();

        return response()->json($listStates);

    }
}
