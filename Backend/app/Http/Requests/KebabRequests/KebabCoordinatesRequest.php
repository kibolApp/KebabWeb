<?php

declare(strict_types=1);

namespace App\Http\Requests\KebabRequests;

use Illuminate\Foundation\Http\FormRequest;

class KebabCoordinatesRequest extends FormRequest
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
            "coordinates" => "required|array",
            "coordinates.*.lat" => "required|numeric|between:-90,90",
            "coordinates.*.lng" => "required|numeric|between:-180,180",
        ];
    }
}
