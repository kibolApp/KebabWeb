<?php

declare(strict_types=1);

namespace App\Http\Requests\KebabRequests;

use Illuminate\Foundation\Http\FormRequest;

class KebabOpeningYearRequest extends FormRequest
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
            "opening_year" => "nullable|integer|digits:4",
        ];
    }
}
