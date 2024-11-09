<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\KebabRequests\KebabRequest;
use App\Models\Kebab;
use Exception;

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
        } catch (Exception $e) {
            return response()->json([
                "error" => "Something went wrong.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function addKebab(KebabRequest $request)
    {
        $data = $request->validated();

        try {
            $kebab = new Kebab($request->all());

            if ($request->hasFile("logo")) {
                $kebab->logo = file_get_contents($request->file("logo")->path());
            }
            $kebab->save();

            return response()->json($kebab, 201);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not add kebab.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function deleteKebab($id)
    {
        $kebab = Kebab::find($id);

        if (!$kebab) {
            return response()->json(["message" => "Kebab not found"], 404);
        }

        $kebab->delete();

        return response()->json(["message" => "Kebab deleted"]);
    }

    public function changeKebabLogo(Request $request, $kebabId)
    {
        try {
            $kebab = Kebab::findOrFail($kebabId);

            if ($request->hasFile("logo")) {
                $kebab->logo = file_get_contents($request->file("logo")->path());

                $kebab->save();

                return response()->json([
                    "message" => "Logo updated successfully.",
                    "kebab" => $kebab,
                ], 200);
            }

            return response()->json([
                "error" => "No logo file provided.",
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not update logo.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function changeKebabName(Request $request, $kebabId)
    {
        $request->validate([
            "name" => "required",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $kebab->name = $request->input("name");

            $kebab->save();

            return response()->json([
                "message" => "Name updated successfully.",
                "kebab" => $kebab,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not update name.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function changeKebabAddress(Request $request, $kebabId)
    {
        $request->validate([
            "address" => "required|string|max:255",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $kebab->address = $request->input("address");

            $kebab->save();

            return response()->json([
                "message" => "Address updated successfully.",
                "kebab" => $kebab,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not update address.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function changeKebabCoordinates(Request $request, $kebabId)
    {
        $request->validate([
            "coordinates" => "required|array",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $kebab->coordinates = json_encode($request->input("coordinates"));

            $kebab->save();

            return response()->json([
                "message" => "Coordinates updated successfully.",
                "kebab" => $kebab,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not update coordinates.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function addSauceToKebab(Request $request, $kebabId)
    {
        $request->validate([
            "sauce" => "required|string",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $sauces = json_decode($kebab->sauces, true) ?? [];

            if (!in_array($request->input("sauce"), $sauces, true)) {
                $sauces[] = $request->input("sauce");
            }

            $kebab->sauces = json_encode($sauces);
            $kebab->save();

            return response()->json([
                "message" => "Sauce added successfully.",
                "sauces" => $sauces,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not add sauce.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function removeSauceFromKebab(Request $request, $kebabId)
    {
        $request->validate([
            "sauce" => "required|string",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $sauces = json_decode($kebab->sauces, true) ?? [];

            if (($key = array_search($request->input("sauce"), $sauces, true)) !== false) {
                unset($sauces[$key]);
            }

            $kebab->sauces = json_encode(array_values($sauces));
            $kebab->save();

            return response()->json([
                "message" => "Sauce removed successfully.",
                "sauces" => $sauces,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not remove sauce.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function addMeatToKebab(Request $request, $kebabId)
    {
        $request->validate([
            "meat" => "required|string",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $meats = json_decode($kebab->meats, true) ?? [];

            if (!in_array($request->input("meat"), $meats, true)) {
                $meats[] = $request->input("meat");
            }

            $kebab->meats = json_encode($meats);
            $kebab->save();

            return response()->json([
                "message" => "Meat added successfully.",
                "meats" => $meats,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not add meat.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function removeMeatFromKebab(Request $request, $kebabId)
    {
        $request->validate([
            "meat" => "required|string",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $meats = json_decode($kebab->meats, true) ?? [];

            if (($key = array_search($request->input("meat"), $meats, true)) !== false) {
                unset($meats[$key]);
            }

            $kebab->meats = json_encode(array_values($meats));
            $kebab->save();

            return response()->json([
                "message" => "Meat removed successfully.",
                "meats" => $meats,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not remove meat.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function changeKebabStatus(Request $request, $kebabId)
    {
        $request->validate([
            "status" => "required|in:exists,closed,planned",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $kebab->status = $request->input("status");

            $kebab->save();

            return response()->json([
                "message" => "Status updated successfully.",
                "kebab" => $kebab,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not update status.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function addOpeningHour(Request $request, $kebabId)
    {
        $request->validate([
            "day" => "required|string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday",
            "hours" => "required|string",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $openingHours = json_decode($kebab->opening_hours, true) ?? [];

            $openingHours[$request->input("day")] = $request->input("hours");

            $kebab->opening_hours = json_encode($openingHours);
            $kebab->save();

            return response()->json([
                "message" => "Opening hours updated successfully.",
                "opening_hours" => $openingHours,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not update opening hours.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function removeOpeningHour(Request $request, $kebabId)
    {
        $request->validate([
            "day" => "required|string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $openingHours = json_decode($kebab->opening_hours, true) ?? [];

            if (isset($openingHours[$request->input("day")])) {
                unset($openingHours[$request->input("day")]);
            }

            $kebab->opening_hours = json_encode($openingHours);
            $kebab->save();

            return response()->json([
                "message" => "Opening hour removed successfully.",
                "opening_hours" => $openingHours,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not remove opening hour.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function changeOpeningHour(Request $request, $kebabId)
    {
        $request->validate([
            "day" => "required|string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday", 
            "hours" => "required|string",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $openingHours = json_decode($kebab->opening_hours, true) ?? [];

            $openingHours[$request->input("day")] = $request->input("hours");

            $kebab->opening_hours = json_encode($openingHours);
            $kebab->save();

            return response()->json([
                "message" => "Opening hour changed successfully.",
                "opening_hours" => $openingHours,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not change opening hour.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function updateOpeningYear(Request $request, $kebabId)
    {
        $request->validate([
            "opening_year" => "nullable|integer|digits:4",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $kebab->opening_year = $request->input("opening_year") ?? null;

            $kebab->save();

            return response()->json([
                "message" => "Opening year updated successfully.",
                "opening_year" => $kebab->opening_year,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not update opening year.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function updateClosingYear(Request $request, $kebabId)
    {
        $request->validate([
            "closing_year" => "nullable|integer|digits:4",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $kebab->closing_year = $request->input("closing_year") ?? null;

            $kebab->save();

            return response()->json([
                "message" => "Closing year updated successfully.",
                "closing_year" => $kebab->closing_year,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not update closing year.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function updateIsCrafted(Request $request, $kebabId)
    {
        $request->validate([
            "is_crafted" => "nullable|boolean",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $kebab->is_crafted = $request->input("is_crafted") ?? null; 

            $kebab->save();

            return response()->json([
                "message" => "Crafted status updated successfully.",
                "is_crafted" => $kebab->is_crafted,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not update crafted status.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function updateIsPremises(Request $request, $kebabId)
    {
        $request->validate([
            "is_premises" => "nullable|boolean",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $kebab->is_premises = $request->input("is_premises") ?? null; 

            $kebab->save();

            return response()->json([
                "message" => "Premises status updated successfully.",
                "is_premises" => $kebab->is_premises,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not update premises status.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function updateIsChainstore(Request $request, $kebabId)
    {
        $request->validate([
            "is_chainstore" => "nullable|boolean",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $kebab->is_chainstore = $request->input("is_chainstore") ?? null; 

            $kebab->save();

            return response()->json([
                "message" => "Chainstore status updated successfully.",
                "is_chainstore" => $kebab->is_chainstore,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not update chainstore status.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function addOrderingOption(Request $request, $kebabId)
    {
        $request->validate([
            "new_option" => "required|string",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $orderingOptions = $kebab->ordering_options ?? [];

            $orderingOptions[] = $request->input("new_option");

            $kebab->ordering_options = $orderingOptions;

            $kebab->save();

            return response()->json([
                "message" => "New ordering option added successfully.",
                "ordering_options" => $kebab->ordering_options,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not add ordering option.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function removeOrderingOption(Request $request, $kebabId)
    {
        $request->validate([
            "option_to_remove" => "required|string",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $orderingOptions = $kebab->ordering_options ?? [];

            $orderingOptions = array_filter($orderingOptions, fn($option) => $option !== $request->input("option_to_remove"));

            $kebab->ordering_options = array_values($orderingOptions); 

            $kebab->save();

            return response()->json([
                "message" => "Ordering option removed successfully.",
                "ordering_options" => $kebab->ordering_options,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not remove ordering option.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function addComment(Request $request, $kebabId)
    {
        $request->validate([
            "id_user" => "required|integer", 
            "comment" => "required|string",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $comments = $kebab->comments ?? [];

            $newComment = [
                "id_user" => $request->input("id_user"),
                "comment" => $request->input("comment"),
            ];

            $comments[] = $newComment; 

            $kebab->comments = $comments;

            $kebab->save();

            return response()->json([
                "message" => "Comment added successfully.",
                "comments" => $kebab->comments,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not add comment.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function removeComment(Request $request, $kebabId)
    {
        $request->validate([
            "id_user" => "required|integer", 
            "comment" => "required|string",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $comments = $kebab->comments ?? [];

            $comments = array_filter($comments, fn($item) => $item["id_user"] !== $request->input("id_user") || $item["comment"] !== $request->input("comment"));

            $kebab->comments = array_values($comments); 

            $kebab->save();

            return response()->json([
                "message" => "Comment removed successfully.",
                "comments" => $kebab->comments,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not remove comment.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function updateGoogleReviews(Request $request, $kebabId)
    {
        $request->validate([
            "google_reviews" => "nullable|numeric|between:0,99.9",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $googleReviews = $request->input("google_reviews") !== null ? $request->input("google_reviews") : null;

            $kebab->google_reviews = $googleReviews;

            $kebab->save();

            return response()->json([
                "message" => "Google reviews updated successfully.",
                "google_reviews" => $kebab->google_reviews,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not update Google reviews.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function updatePyszneplReviews(Request $request, $kebabId)
    {
        $kebab = Kebab::findOrFail($kebabId);
        $kebab->pysznepl_reviews = $request->input("pysznepl_reviews");
        $kebab->save();

        return response()->json(["message" => "Pyszne.pl reviews updated successfully."]);
    }

    public function getPyszneplReviews($kebabId)
    {
        $kebab = Kebab::findOrFail($kebabId);

        return response()->json(["pysznepl_reviews" => $kebab->pysznepl_reviews]);
    }
}
