<?php


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::name('user.')->group(function () {
    Route::view('/table', 'table')->middleware('auth')->name('table');
    Route::view('/cpsportal', 'cps_portal_table')->middleware('auth')->name('cpsportal');

    Route::get('/login', [\App\Http\Controllers\LoginController::class, 'getLoginPage'])->name('login');

    Route::post('/getpasshash', [\App\Http\Controllers\PasswordController::class, 'getNewPasswordHash'])->name('getPassHash');

    Route::post('/login', [\App\Http\Controllers\LoginController::class, 'authenticate']);

    Route::get('/logout', function () {
        Auth::logout();
        return redirect('/login');
    })->name('logout');

});

