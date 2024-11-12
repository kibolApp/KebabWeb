<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Str;
use App\Models\User;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanRegister()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Jasio',
            'email' => 'Jasio@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', ['email' => 'Jasio@example.com']);
    }

    public function testUserCantRegisterWithMissingPasswordConfirmation()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Jasio',
            'email' => 'Jasio@example.com',
            'password' => 'password',
            'password_confirmation' => '',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
        $this->assertDatabaseMissing('users', ['email' => 'Jasio@example.com']);
    }
    
    public function testUserCantRegisterWithMissingName()
    {
        $response = $this->postJson('/api/register', [
            'name' => '',
            'email' => 'Jasio@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);
    
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name']);
        $this->assertDatabaseMissing('users', ['email' => 'Jasio@example.com']);
    }

    public function testUserCannotLoginWithInvalidCredentials()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'wronguser@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(422);
        $response->assertJson(['message' => 'The selected email is invalid.']);
    }
    public function testUserMaxNameTest(): void
    {
        $response = $this->post("/api/register", [
            "name" => Str::random(256),
            'email' => 'Jasio@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(200);
    }
    public function testUserCanLogin()
    {
    User::factory()->create([
        'email' => 'Jasio@example.com',
        'password' => bcrypt('password'),
        'isAdmin' => false,
    ]);

    $response = $this->post('/api/login', [
        'email' => 'Jasio@example.com',
        'password' => 'password',
    ]);

    $response->assertStatus(200);
    $response->assertJsonStructure(['user', 'token']);
    }
}
