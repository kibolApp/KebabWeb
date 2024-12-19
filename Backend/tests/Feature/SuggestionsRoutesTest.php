<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class SuggestionsRoutesTest extends TestCase
{
    use RefreshDatabase;

    public function testAdminCanViewAllSuggestions(): void
    {
        $admin = User::factory()->create([
            "isAdmin" => 1,
            "password" => Hash::make("password"),
        ]);

        $this->actingAs($admin);

        $response = $this->getJson("/api/suggestions");

        $response->assertStatus(200);

        $responseData = $response->json();
        $this->assertIsArray($responseData);
    }
}
