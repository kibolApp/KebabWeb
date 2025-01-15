<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Kebab;
use Illuminate\Database\Eloquent\Factories\Factory;

class KebabFactory extends Factory
{
    protected $model = Kebab::class;

    public function definition(): array
    {
        return [
            "logo" => $this->faker->imageUrl(),
            "name" => $this->faker->company,
            "address" => $this->faker->address,
            "coordinates" => json_encode([
                ["lat" => $this->faker->latitude, "lng" => $this->faker->longitude],
            ]),
            "sauces" => json_encode([$this->faker->word, $this->faker->word]),
            "meats" => json_encode([$this->faker->word, $this->faker->word]),
            "status" => $this->faker->randomElement(["exists", "closed", "planned"]),
            "opening_hours" => json_encode([
                ["day" => "monday", "hours" => "10:00-20:00"],
                ["day" => "tuesday", "hours" => "10:00-20:00"],
            ]),
            "opening_year" => $this->faker->year(),
            "closing_year" => $this->faker->optional()->year(),
            "is_crafted" => $this->faker->boolean,
            "is_premises" => $this->faker->boolean,
            "is_chainstore" => $this->faker->boolean,
            "ordering_options" => $this->faker->randomElement(["delivery", "pickup"]),
            "pages" => json_encode([
                "pyszne.pl" => $this->faker->url,
                "ubereats" => $this->faker->url,
            ]),
        ];
    }
}
