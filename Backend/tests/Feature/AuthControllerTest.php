<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanRegister(): void
    {
        $response = $this->postJson("/api/register", [
            "name" => "Jasio",
            "email" => "Jasio@example.com",
            "password" => "password",
            "password_confirmation" => "password",
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas("users", ["email" => "Jasio@example.com"]);
    }

    public function testUserCantRegisterWithMissingPasswordConfirmation(): void
    {
        $response = $this->postJson("/api/register", [
            "name" => "Jasio",
            "email" => "Jasio@example.com",
            "password" => "password",
            "password_confirmation" => "",
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(["password"]);
        $this->assertDatabaseMissing("users", ["email" => "Jasio@example.com"]);
    }

    public function testUserCantRegisterWithMissingName(): void
    {
        $response = $this->postJson("/api/register", [
            "name" => "",
            "email" => "Jasio@example.com",
            "password" => "password",
            "password_confirmation" => "password",
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(["name"]);
        $this->assertDatabaseMissing("users", ["email" => "Jasio@example.com"]);
    }

    public function testUserCannotLoginWithInvalidCredentials(): void
    {
        $response = $this->postJson("/api/login", [
            "email" => "wronguser@example.com",
            "password" => "wrongpassword",
        ]);

        $response->assertStatus(422);
        $response->assertJson(["message" => "The selected email is invalid."]);
    }

    public function testUserMaxNameTest(): void
    {
        $response = $this->post("/api/register", [
            "name" => Str::random(256),
            "email" => "Jasio@example.com",
            "password" => "password",
            "password_confirmation" => "password",
        ]);

        $response->assertStatus(200);
    }

    public function testUserCanLogin(): void
    {
        User::factory()->create([
            "email" => "Jasio@example.com",
            "password" => bcrypt("password"),
            "isAdmin" => false,
        ]);

        $response = $this->post("/api/login", [
            "email" => "Jasio@example.com",
            "password" => "password",
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(["user", "token"]);
    }
}
