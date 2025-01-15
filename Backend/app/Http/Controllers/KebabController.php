<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\KebabRequests\KebabAddressRequest;
use App\Http\Requests\KebabRequests\KebabClosingYearRequest;
use App\Http\Requests\KebabRequests\KebabCommentRequest;
use App\Http\Requests\KebabRequests\KebabCoordinatesRequest;
use App\Http\Requests\KebabRequests\KebabIsChainstoreRequest;
use App\Http\Requests\KebabRequests\KebabIsCraftedRequest;
use App\Http\Requests\KebabRequests\KebabIsPremisesRequest;
use App\Http\Requests\KebabRequests\KebabMeatRequest;
use App\Http\Requests\KebabRequests\KebabNameRequest;
use App\Http\Requests\KebabRequests\KebabOpeningHourRequest;
use App\Http\Requests\KebabRequests\KebabOpeningYearRequest;
use App\Http\Requests\KebabRequests\KebabOrderingOptionRequest;
use App\Http\Requests\KebabRequests\KebabPageRequest;
use App\Http\Requests\KebabRequests\KebabRemoveOpeningHourRequest;
use App\Http\Requests\KebabRequests\KebabRemoveOrderingOptionRequest;
use App\Http\Requests\KebabRequests\KebabRequest;
use App\Http\Requests\KebabRequests\KebabStatusRequest;
use App\Http\Requests\KebabRequests\SauceKebabRequest;
use App\Models\Kebab;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * @group Kebab
 * **/
class KebabController extends Controller
{
    public function getAllKebabs()
    {
        try {
            $data = Kebab::all()->map(function ($kebab) {
                $kebab->logo = $kebab->logo ? "data:image/jpeg;base64," . base64_encode($kebab->logo) : null;

                if (!is_array($kebab->opening_hours)) {
                    $kebab->opening_hours = json_decode($kebab->opening_hours, true) ?? [];
                }

                if (!is_array($kebab->meats)) {
                    $kebab->meats = json_decode($kebab->meats, true) ?? [];
                }

                if (!is_array($kebab->sauces)) {
                    $kebab->sauces = json_decode($kebab->sauces, true) ?? [];
                }

                if (!is_array($kebab->ordering_options)) {
                    $kebab->ordering_options = json_decode($kebab->ordering_options, true) ?? [];
                }

                if (!is_array($kebab->pages)) {
                    $kebab->pages = json_decode($kebab->pages, true) ?? [];
                }

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

            $binaryData = file_get_contents("php://input");

            if ($binaryData) {
                $kebab->logo = $binaryData;
                $kebab->save();

                $logoUrl = url("/storage/kebabs/" . $kebab->id . "/logo.jpg");

                return response()->json([
                    "message" => "Logo updated successfully.",
                    "kebab" => [
                        "id" => $kebab->id,
                        "logo_url" => $logoUrl,
                    ],
                ], 200);
            }

            return response()->json([
                "error" => "No logo file provided.",
            ], 400);
        } catch (Exception $e) {
            Log::error("Error updating logo: " . $e->getMessage());

            return response()->json([
                "error" => "Could not update logo.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function changeKebabName(KebabNameRequest $request, $kebabId)
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

    public function changeKebabAddress(KebabAddressRequest $request, $kebabId)
    {
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

    public function changeKebabCoordinates(KebabCoordinatesRequest $request, $kebabId)
    {
        try {
            $kebab = Kebab::findOrFail($kebabId);

            $kebab->coordinates = $request->input("coordinates");

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

    public function addSauceToKebab(SauceKebabRequest $request, $kebabId)
    {
        try {
            $kebab = Kebab::findOrFail($kebabId);

            $sauces = is_array($kebab->sauces) ? $kebab->sauces : json_decode($kebab->sauces, true) ?? [];

            if (!in_array($request->input("sauce"), $sauces, true)) {
                $sauces[] = $request->input("sauce");
            }

            $kebab->sauces = $sauces;
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

    public function removeSauceFromKebab(SauceKebabRequest $request, $kebabId)
    {
        try {
            $kebab = Kebab::findOrFail($kebabId);

            $sauces = is_array($kebab->sauces) ? $kebab->sauces : json_decode($kebab->sauces, true) ?? [];

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

    public function addMeatToKebab(KebabMeatRequest $request, $kebabId)
    {
        try {
            $kebab = Kebab::findOrFail($kebabId);
            $meats = is_array($kebab->meats) ? $kebab->meats : json_decode($kebab->meats, true) ?? [];

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

    public function removeMeatFromKebab(KebabMeatRequest $request, $kebabId)
    {
        try {
            $kebab = Kebab::findOrFail($kebabId);

            $meats = is_array($kebab->meats) ? $kebab->meats : json_decode($kebab->meats, true) ?? [];

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

    public function changeKebabStatus(KebabStatusRequest $request, $kebabId)
    {
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

    public function addOpeningHour(KebabOpeningHourRequest $request, $kebabId)
    {
        try {
            $kebab = Kebab::findOrFail($kebabId);
            $openingHours = [];

            if (is_array($kebab->opening_hours)) {
                $openingHours = $kebab->opening_hours;
            } else {
                if (is_string($kebab->opening_hours)) {
                    $openingHours = json_decode($kebab->opening_hours, true) ?? [];
                }
            }

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

    public function removeOpeningHour(KebabRemoveOpeningHourRequest $request, $kebabId)
    {
        try {
            $kebab = Kebab::findOrFail($kebabId);
            Log::info("Kebab znaleziony:", ["id" => $kebabId]);
            $openingHours = [];

            if (is_array($kebab->opening_hours)) {
                $openingHours = $kebab->opening_hours;
            } else {
                if (is_string($kebab->opening_hours)) {
                    $openingHours = json_decode($kebab->opening_hours, true) ?? [];
                }
            }

            if (isset($openingHours[$request->input("day")])) {
                unset($openingHours[$request->input("day")]);
            }

            $kebab->opening_hours = $openingHours;
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

    public function changeOpeningHour(KebabOpeningHourRequest $request, $kebabId)
    {
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

    public function updateOpeningYear(KebabOpeningYearRequest $request, $kebabId)
    {
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

    public function updateClosingYear(KebabClosingYearRequest $request, $kebabId)
    {
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

    public function updateIsCrafted(KebabIsCraftedRequest $request, $kebabId)
    {
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

    public function updateIsPremises(KebabIsPremisesRequest $request, $kebabId)
    {
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

    public function updateIsChainstore(KebabIsChainstoreRequest $request, $kebabId)
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

    public function addOrderingOption(KebabOrderingOptionRequest $request, $kebabId)
    {
        try {
            $kebab = Kebab::findOrFail($kebabId);

            $orderingOptions = is_array($kebab->ordering_options) ? $kebab->ordering_options : json_decode($kebab->ordering_options, true) ?? [];

            if (!in_array($request->input("new_option"), $orderingOptions, true)) {
                $orderingOptions[] = $request->input("new_option");
            }
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

    public function removeOrderingOption(KebabRemoveOrderingOptionRequest $request, $kebabId)
    {
        try {
            $kebab = Kebab::findOrFail($kebabId);

            $orderingOptions = is_array($kebab->ordering_options) ? $kebab->ordering_options : json_decode($kebab->ordering_options, true) ?? [];

            if (($key = array_search($request->input("option_to_remove"), $orderingOptions, true)) !== false) {
                unset($orderingOptions[$key]);
            }
            $kebab->ordering_options = $orderingOptions;

            $kebab->ordering_options = json_encode(array_values($orderingOptions)); 

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

    public function addComment(KebabCommentRequest $request, $kebabId)
    {
        $request->validate([
            "id_user" => "required|integer", 
            "comment" => "required|string",
            "user_name" => "required|string",
        ]);

        try {
            $kebab = Kebab::findOrFail($kebabId);

            $comments = $kebab->comments ?? [];

            $newComment = [
                "id_user" => $request->input("id_user"),
                "user_name" => $request->input("user_name"),
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

    public function GetComments(Request $request, $kebabId)
    {
        try {
            $kebab = Kebab::find($kebabId);

            if (!$kebab) {
                return response()->json([
                    "error" => "Kebab not found.",
                ], 404);
            }

            $comments = $kebab->comments;

            return response()->json($comments);
        } catch (Exception $e) {
            return response()->json([
                "error" => "An error occurred while fetching kebab comments.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }        

    public function removeComment(KebabCommentRequest $request, $kebabId)
    {
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

    public function addPage(KebabPageRequest $request, $kebabId)
    {
        try {
            $kebab = Kebab::findOrFail($kebabId);

            $page = is_array($kebab->pages) ? $kebab->pages : json_decode($kebab->pages, true) ?? [];

            if (!in_array($request->input("page"), $page, true)) {
                $page[] = $request->input("page");
            }
            $kebab->pages = $page;

            $kebab->save();

            return response()->json([
                "message" => "New page added successfully.",
                "pages" => $kebab->pages,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not add page.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function removePage(KebabPageRequest $request, $kebabId)
    {
        try {
            $kebab = Kebab::findOrFail($kebabId);

            $page = is_array($kebab->pages) ? $kebab->pages : json_decode($kebab->pages, true) ?? [];

            if (($key = array_search($request->input("page"), $page, true)) !== false) {
                unset($page[$key]);
            }
            $kebab->pages = $page;

            $kebab->pages = json_encode(array_values($page)); 

            $kebab->save();

            return response()->json([
                "message" => "Page removed successfully.",
                "pages" => $kebab->pages,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Could not remove page.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }
}
