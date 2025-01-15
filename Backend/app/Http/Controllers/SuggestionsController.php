<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\SuggestionRequest;
use App\Models\Suggestions;

/**
 * @group Suggestions
 * **/
class SuggestionsController extends Controller
{
    public function createSuggestion(SuggestionRequest $request)
    {
        $suggestion = Suggestions::create([
            "user" => $request->input("user"),
            "contents" => $request->input("contents"),
        ]);

        return response()->json(["message" => "Suggestion created successfully!", "suggestion" => $suggestion], 201);
    }

    public function showAllSuggestions()
    {
        $suggestions = Suggestions::all();

        return response()->json(["suggestions" => $suggestions]);
    }

    public function destroySuggestion($id)
    {
        $suggestion = Suggestions::find($id);

        if (!$suggestion) {
            return response()->json(["message" => "Suggestion not found"], 404);
        }

        $suggestion->delete();

        return response()->json(["message" => "Suggestion deleted successfully."]);
    }
}
