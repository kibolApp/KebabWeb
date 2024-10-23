<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getCurrentUser()
    {
        if (Auth::check()) {
            $user = Auth::user();

            return response()->json(["user" => $user], 200);
        }

        return response()->json(["message" => "Użytkownik niezalogowany"], 401);
    }
}
