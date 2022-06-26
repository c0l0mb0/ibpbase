<?php

use App\Http\Controllers\BuildingsController;
use App\Http\Controllers\InnerEquipmentController;
use App\Http\Controllers\KapRemontController;
use App\Http\Controllers\ListLocationsController;
use App\Http\Controllers\ListStatesController;
use App\Http\Controllers\OuterEquipmentController;
use App\Http\Controllers\PenRenController;
use App\Http\Controllers\TehnObslRemontController;
use App\Http\Controllers\TroController;
use App\Http\Controllers\ZipEquipmentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->group(function(){
    Route::get('outerequipall', [OuterEquipmentController::class, 'index']);
    Route::get('indexbuildingouterinner', [OuterEquipmentController::class, 'indexBuildingOuterInner']);
    Route::get('indexbuildingouter', [OuterEquipmentController::class, 'indexBuildingOuter']);
    Route::get('indexbuildingouterbyid/{id}', [OuterEquipmentController::class, 'indexBuildingOuterByListLocationId']);
    Route::get('outerequip/{id}', [OuterEquipmentController::class, 'show']);
    Route::get('showinnerbyouterid/{id}', [OuterEquipmentController::class, 'showInnerByOuterId']);

    Route::get('listofobjects', [BuildingsController::class, 'listOfObjects']);

    Route::get('listoflocations', [ListLocationsController::class, 'index']);
    Route::get('listofstates', [ListStatesController::class, 'index']);

    Route::post('outerequip', [OuterEquipmentController::class, 'create']);
    Route::post('outerequipwithlocation', [OuterEquipmentController::class, 'createWithLocation']);

    Route::put('outerequip/{id}', [OuterEquipmentController::class, 'update']);

    Route::delete('outerequip/{id}', [OuterEquipmentController::class, 'destroy']);
    Route::delete('outerequipwithlocation/{id}', [OuterEquipmentController::class, 'destroyOuterEquipAndItsLocation']);

    Route::get('innerequipall', [InnerEquipmentController::class, 'index']);
    Route::get('innerequip/{id}', [InnerEquipmentController::class, 'show']);
    Route::post('innerequip', [InnerEquipmentController::class, 'create']);
    Route::put('innerequip/{id}', [InnerEquipmentController::class, 'update']);
    Route::delete('innerequip/{id}', [InnerEquipmentController::class, 'destroy']);

    Route::get('kapremontall', [KapRemontController::class, 'index']);
    Route::get('kapremont/{id}', [KapRemontController::class, 'show']);
    Route::post('kapremont', [KapRemontController::class, 'create']);
    Route::put('kapremont/{id}', [KapRemontController::class, 'update']);
    Route::delete('kapremont/{id}', [KapRemontController::class, 'destroy']);

    Route::get('tehnobslremontall', [TehnObslRemontController::class, 'index']);
    Route::get('tehnobslremont/{id}', [TehnObslRemontController::class, 'show']);
    Route::post('tehnobslremont', [TehnObslRemontController::class, 'create']);
    Route::put('tehnobslremont/{id}', [TehnObslRemontController::class, 'update']);
    Route::delete('tehnobslremont/{id}', [TehnObslRemontController::class, 'destroy']);

    Route::get('penrenall', [PenRenController::class, 'index']);
    Route::get('penren/{id}', [PenRenController::class, 'show']);
    Route::post('penren', [PenRenController::class, 'create']);
    Route::put('penren/{id}', [PenRenController::class, 'update']);
    Route::delete('penren/{id}', [PenRenController::class, 'destroy']);

    Route::get('troall', [TroController::class, 'index']);
    Route::get('tro/{id}', [TroController::class, 'show']);
    Route::post('tro', [TroController::class, 'create']);
    Route::put('tro/{id}', [TroController::class, 'update']);
    Route::delete('tro/{id}', [TroController::class, 'destroy']);

    Route::get('zipall', [ZipEquipmentController::class, 'index']);
    Route::get('zip/{id}', [ZipEquipmentController::class, 'show']);
    Route::post('zip', [ZipEquipmentController::class, 'create']);
    Route::put('zip/{id}', [ZipEquipmentController::class, 'update']);
    Route::delete('zip/{id}', [ZipEquipmentController::class, 'destroy']);

});





