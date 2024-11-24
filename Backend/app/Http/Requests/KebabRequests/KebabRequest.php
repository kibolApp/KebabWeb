<?php

declare(strict_types=1);

namespace App\Http\Requests;

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
            "address" => "required",
            "coordinates" => "required",
            "sauces" => "required",
            "meats" => "required",
            "status" => "required",
            "opening_hours" => "required",
            "opening_year" => "required",
            "closing_year" => "required",
            "is_crafted" => "required",
            "is_premises" => "required",
            "is_chainstore" => "required",
            "ordering_options" => "required",
        ];
    }
}
