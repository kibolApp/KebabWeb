<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
  

    public function getCurrentUser()
    {
        if (Auth::check()) {
            $user = Auth::user();

            return response()->json(['user' => $user], 200);
        }

        return response()->json(['message' => 'Użytkownik niezalogowany'], 401);
    }


}
