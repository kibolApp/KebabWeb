<?php

declare(strict_types=1);

namespace App\Http\Requests\KebabRequests;

use Illuminate\Foundation\Http\FormRequest;

class KebabRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "logo" => "required",
            "name" => "required",
            "address" => "required|string|max:255",
            "coordinates" => "required|array",
            "coordinates.*.lat" => "required|numeric|between:-90,90",
            "coordinates.*.lng" => "required|numeric|between:-180,180",
            "sauce" => "required|string",
            "meats" => "required|string",
            "status" => "required|in:exists,closed,planned",
            "opening_hours" => "required|array",
            "opening_hours.*.day" => "required|string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday",
            "opening_hours.*.hours" => "required|string",
            "opening_year" => "nullable|integer|digits:4",
            "closing_year" => "nullable|integer|digits:4",
            "is_crafted" => "required|boolean",
            "is_premises" => "required|boolean",
            "is_chainstore" => "required|boolean",
            "ordering_options" => "required|string",
            "page" => "required|string",
        ];
    }
}
