<?php

declare(strict_types=1);

namespace App\Http\Middleware;

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() && $request->user()->isAdmin === 1) {
            return $next($request);
        }

        return response()->json(["error" => "Unauthorized"], 403);
    }
}
