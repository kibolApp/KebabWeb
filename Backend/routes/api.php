<?php

declare(strict_types=1);

use App\Http\Controllers\AuthController;
use App\Http\Controllers\KebabController;
use App\Http\Controllers\SuggestionsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);
Route::get("/kebabs", [KebabController::class, "getAllKebabs"]);
Route::middleware("auth:sanctum")->group(function (): void {
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::get("/getCurrentUser", [UserController::class, "getCurrentUser"]);
    Route::get("/fav/{id}", [UserController::class, "getUserFavorites"]);
    Route::post("/addfav", [UserController::class, "addToFavorites"]);
    Route::post("/remfav", [UserController::class, "removeFromFavorites"]);
    Route::delete("/deleteUser/{id}", [UserController::class, "deleteUser"]);
    Route::put("/changeName/{id}", [UserController::class, "changeName"]);
    Route::put("/changePassword/{id}", [UserController::class, "changePassword"]);
    Route::put("/changeEmail/{id}", [UserController::class, "changeEmail"]);
    Route::post("/suggestions", [SuggestionsController::class, "createSuggestion"]);
});

Route::group(["middleware" => ["checkAdmin"]], function (): void {
    Route::get("/getAllUsers", [UserController::class, "getAllUsers"]);
    Route::post("/addNewUser", [UserController::class, "addNewUser"]);
    Route::get("/getKebabs", [KebabController::class, "getAllKebabs"]);
    Route::post("/addKebab", [KebabController::class, "addKebab"]);
    Route::delete("/kebabs/{id}", [KebabController::class, "deleteKebab"]);
    Route::put("/kebabs/{kebabId}/logo", [KebabController::class, "changeKebabLogo"]);
    Route::put("/kebabs/{kebabId}/name", [KebabController::class, "changeKebabName"]);
    Route::put("/kebabs/{kebabId}/address", [KebabController::class, "changeKebabAddress"]);
    Route::put("/kebabs/{kebabId}/coordinates", [KebabController::class, "changeKebabCoordinates"]);
    Route::post("/kebabs/{kebabId}/sauce", [KebabController::class, "addSauceToKebab"]);
    Route::delete("/kebabs/{kebabId}/sauce", [KebabController::class, "removeSauceFromKebab"]);
    Route::post("/kebabs/{kebabId}/meat", [KebabController::class, "addMeatToKebab"]);
    Route::delete("/kebabs/{kebabId}/meat", [KebabController::class, "removeMeatFromKebab"]);
    Route::put("/kebabs/{kebabId}/status", [KebabController::class, "changeKebabStatus"]);
    Route::post("/kebabs/{kebabId}/opening-hours", [KebabController::class, "addOpeningHour"]);
    Route::delete("/kebabs/{kebabId}/opening-hours", [KebabController::class, "removeOpeningHour"]);
    Route::put("/kebabs/{kebabId}/opening-hours", [KebabController::class, "changeOpeningHour"]);
    Route::put("/kebabs/{kebabId}/opening-year", [KebabController::class, "updateOpeningYear"]);
    Route::put("/kebabs/{kebabId}/closing-year", [KebabController::class, "updateClosingYear"]);
    Route::put("/kebabs/{kebabId}/is-crafted", [KebabController::class, "updateIsCrafted"]);
    Route::put("/kebabs/{kebabId}/is-premises", [KebabController::class, "updateIsPremises"]);
    Route::put("/kebabs/{kebabId}/is-chainstore", [KebabController::class, "updateIsChainstore"]);
    Route::post("/kebabs/{kebabId}/ordering-options", [KebabController::class, "addOrderingOption"]);
    Route::delete("/kebabs/{kebabId}/ordering-options", [KebabController::class, "removeOrderingOption"]);
    Route::post("/kebabs/{kebabId}/comments", [KebabController::class, "addComment"]);
    Route::delete("/kebabs/{kebabId}/comments", [KebabController::class, "removeComment"]);
    Route::put("/kebabs/{kebabId}/google-reviews", [KebabController::class, "updateGoogleReviews"]);
    Route::put("/kebabs/{kebabId}/pysznepl-reviews", [KebabController::class, "updatePyszneplReviews"]);
    Route::get("/suggestions", [SuggestionsController::class, "showAllSuggestions"]);
    Route::delete("/suggestions/{id}", [SuggestionsController::class, "destroySuggestion"]);
});
