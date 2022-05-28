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

Route::get('/', function () {
    return view('welcome');
});
Route::name('user.')->group(function() {
    Route::view('/table','table')->middleware('auth')->name('table');

    Route::get('/login',function() {
        if (Auth::check()) {
            return redirect(route('user.table'));
        }
        return view('login');
    })->name('login');

    Route::post('/login',[\App\Http\Controllers\LoginController::class, 'authenticate']);

    Route::get('/logout',function () {
        Auth::logout();
        return redirect('/login');
    })->name('logout');
});
