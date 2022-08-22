<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'user_name' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            if (Auth::user()->user_name == 'cpsaf') {
                return redirect(route('user.cps_table'));
            }
            if (Auth::user()->user_name == 'cps' || Auth::user()->user_name == 'coir') {
                return redirect(route('user.table'));
            }
        }

        return redirect(route('user.login'))->withErrors([
            'common_error' => 'Не удалось авторизироваться'
        ]);
    }

    public function getLoginPage ()
    {
        if (Auth::check()) {
            if (Auth::user()->user_name == 'cpsaf') {
                return redirect(route('user.cps_table'));
            }
            if (Auth::user()->user_name == 'cps' || Auth::user()->user_name == 'coir') {
                return redirect(route('user.table'));
            }
        }
        return view('login');
    }
}
