<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Kebab;

class KebabController extends Controller
{
    public function getAllKebabs()
    {
        try {
            $data = Kebab::all()->map(function ($kebab) {
                $kebab->logo = $kebab->logo ? "data:image/jpeg;base64," . base64_encode($kebab->logo) : null;

                return $kebab;
            });

            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json([
                "error" => "Something went wrong.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }
}
