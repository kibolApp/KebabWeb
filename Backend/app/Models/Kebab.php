<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Kebab extends Model
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    public $timestamps = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "logo",
        "name",
        "address",
        "coordinates",
        "sauces",
        "meats",
        "status",
        "opening_hours",
        "opening_year",
        "closing_year",
        "is_crafted",
        "is_premises",
        "is_chainstore",
        "ordering_options",
        "comments",
        "google_reviews",
        "pysznepl_reviews",
    ];

    protected $casts = [
        "coordinates" => "array",
        "sauces" => "array",
        "meats" => "array",
        "opening_hours" => "array",
        "ordering_options" => "array",
        "comments" => "array",
    ];
}
