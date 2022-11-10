<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{

    public function getNewPasswordHash(Request $request)
    {
        $password = $request->passwordToHash;
        $hashedPassword = Hash::make($password,);
        return response()->json($hashedPassword);
    }
}
