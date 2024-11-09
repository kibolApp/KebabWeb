<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ChangeEmailRequest;
use App\Http\Requests\ChangeNameRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\FavoriteKebabRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getCurrentUser()
    {
        if (Auth::check()) {
            $user = Auth::user();

            return response()->json(["user" => $user], 200);
        }

        return response()->json(["message" => "User not Auth"], 401);
    }

    public function getAllUsers()
    {
        $users = User::all();

        return response()->json($users);
    }

    public function addNewUser(UserRequest $request)
    {
        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password),
            "role" => $request->role,
        ]);

        return response()->json($user, 201);
    }

    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(["message" => "User not found"], 404);
        }

        $user->delete();

        return response()->json(["message" => "User deleted"]);
    }

    public function changeName(ChangeNameRequest $request, $id)
    {
        $user = User::find($id);

        if ($user->name !== $request->oldName) {
            return response()->json(["message" => "Old name not match."], 400);
        }

        $user->update([
            "name" => $request->newName,
        ]);

        return response()->json($user);
    }

    public function changePassword(ChangePasswordRequest $request, $id)
    {
        $user = User::find($id);

        if (!Hash::check($request->oldPassword, $user->password)) {
            return response()->json(["message" => "Old password not match."], 400);
        }

        if ($request->newPassword === $request->confirmPassword) {
            $user->update([
                "password" => Hash::make($request->newPassword),
            ]);
        } else {
            return response()->json(["message" => "Incorrect password confirmation."], 400);
        }

        return response()->json($user);
    }

    public function changeEmail(ChangeEmailRequest $request, $id)
    {
        $user = User::find($id);

        if ($user->email !== $request->oldEmail) {
            return response()->json(["message" => "Old email not match."], 400);
        }

        if ($request->newEmail === $request->confirmEmail) {
            $user->update([
                "email" => $request->newEmail,
            ]);
        } else {
            return response()->json(["message" => "Invalid email confirmation."], 400);
        }

        return response()->json($user);
    }

    public function getUserFavorites($id)
    {
        $user = User::find($id);

        if ($user) {
            $favorites = $user->favorites ? json_decode($user->favorites, true) : [];

            return response()->json(["favorites" => $favorites]);
        }

        return response()->json(["error" => "User not found"], 404);
    }

    public function addToFavorites(FavoriteKebabRequest $request)
    {
        $userId = $request->input("user_id");
        $kebabId = $request->input("kebab_id");

        $user = User::find($userId);

        if ($user) {
            $favorites = $user->favorites ? json_decode($user->favorites, true) : [];

            if (!in_array($kebabId, $favorites, true)) {
                $favorites[] = $kebabId;  
                $user->favorites = json_encode($favorites);  
                $user->save();

                return response()->json(["message" => "Kebab added to favorites"]);
            }

            return response()->json(["message" => "Kebab is already in favorites"], 400);
        }

        return response()->json(["error" => "User not found"], 404);
    }

    public function removeFromFavorites(FavoriteKebabRequest $request)
    {
        $userId = $request->input("user_id");
        $kebabId = $request->input("kebab_id");

        $user = User::find($userId);

        if ($user) {
            $favorites = $user->favorites ? json_decode($user->favorites, true) : [];

            if (($key = array_search($kebabId, $favorites, true)) !== false) {
                unset($favorites[$key]);
                $user->favorites = json_encode(array_values($favorites));  
                $user->save();

                return response()->json(["message" => "Kebab removed from favorites"]);
            }

            return response()->json(["message" => "Kebab not found in favorites"], 400);
        }

        return response()->json(["error" => "User not found"], 404);
    }
}
