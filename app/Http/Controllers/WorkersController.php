<?php

namespace App\Http\Controllers;


use App\Models\Workers;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class WorkersController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $workers = DB::table('workers')
            ->select(DB::raw('workers.id as id, id_user, fio, tab_nom, worker_position,
             fire_instr_last,fire_instr_next'))
            ->orderBy('workers.id', 'ASC')
            ->get();

        return response()->json($workers);
    }

    public function addSixMonthFromLastDateToNextDate(Request $request)
    {
        $lastCheckDateString = $request->fire_instr_last;
        if ($lastCheckDateString == null) {
            return response()->json('empty fire_instr_last date');
        }
        $lastCheckDateFormatedAsDate = new DateTime($lastCheckDateString);
        $lastCheckDateFormatedAsDate->format('Y-m-d');
        $lastCheckDateFormatedAsDate->modify('+6 month');

        $workersId = $request->id;
        $workers = Workers::find($workersId);
        $workers->fire_instr_next = $lastCheckDateFormatedAsDate;
        $workers->save();
        return response()->json($workers->fire_instr_next);
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
