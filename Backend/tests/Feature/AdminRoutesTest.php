<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminRoutesTest extends TestCase
{
    use RefreshDatabase;

    public function testAdminCanAccessAdminRoutes(): void
    {
        $admin = User::factory()->create([
            "isAdmin" => 1,
            "password" => Hash::make("password"),
        ]);

        $this->actingAs($admin);

        $response = $this->getJson("/api/getAllUsers");

        $response->assertStatus(200);

        $responseData = $response->json();
        $this->assertIsArray($responseData);
        $this->assertNotEmpty($responseData);
    }

    public function testNonAdminCannotAccessAdminRoutes(): void
    {
        $response = $this->postJson("/api/register", [
            "name" => "NonAdmin",
            "email" => "nonadmin@example.com",
            "password" => "password",
            "password_confirmation" => "password",
        ]);

        $response->assertStatus(200);

        $user = User::where("email", "nonadmin@example.com")->first();
        $this->actingAs($user);

        $response = $this->getJson("/api/getAllUsers");

        $response->assertStatus(403);
    }

    public function testGuestCannotAccessAdminRoutes(): void
    {
        $response = $this->getJson("/api/getAllUsers");

        $response->assertStatus(401);
    }

    public function testAdminCanDeleteUser(): void
    {
        $admin = User::factory()->create([
            "isAdmin" => 1,
            "password" => Hash::make("password"),
        ]);

        $userToDelete = User::factory()->create([
            "isAdmin" => 0,
            "password" => Hash::make("password"),
        ]);

        $this->actingAs($admin);

        $response = $this->deleteJson("/api/deleteUser/{$userToDelete->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing("users", ["id" => $userToDelete->id]);
    }

    public function testNonAdminCannotDeleteUser(): void
    {
        $user = User::factory()->create([
            "isAdmin" => 0,
            "password" => Hash::make("password"),
        ]);

        $userToDelete = User::factory()->create([
            "isAdmin" => 0,
            "password" => Hash::make("password"),
        ]);

        $this->actingAs($user);

        $response = $this->deleteJson("/api/deleteUser/{$userToDelete->id}");

        $response->assertStatus(403);

        $this->assertDatabaseHas("users", ["id" => $userToDelete->id]);
    }
}
