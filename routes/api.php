<?php

use App\Http\Controllers\BuildingsController;
use App\Http\Controllers\InnerEquipmentController;
use App\Http\Controllers\ListLocationsController;
use App\Http\Controllers\ListStatesController;
use App\Http\Controllers\OuterEquipmentController;
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
    Route::get('outerequip/{id}', [OuterEquipmentController::class, 'show']);
    Route::get('showinnerbyouterid/{id}', [OuterEquipmentController::class, 'showInnerByOuterId']);

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

    Route::get('listofobjects', [BuildingsController::class, 'listOfObjects']);

    Route::get('listoflocations', [ListLocationsController::class, 'index']);
    Route::get('listofstates', [ListStatesController::class, 'index']);
});





