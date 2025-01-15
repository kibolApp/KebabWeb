<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Kebab;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class KebabControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create([
            'email' => 'admin@admin.pl',
            'password' => Hash::make('admin'),
            'isAdmin' => 1,
        ]);
    }


    public function testAdminCanUpdateKebabAddress(): void
    {
        $kebab = Kebab::factory()->create();
        $payload = ['address' => 'New Address'];

        $response = $this->actingAs($this->admin)->putJson("/api/kebabs/{$kebab->id}/address", $payload);

        $response->assertStatus(200);
        $this->assertDatabaseHas('kebabs', ['id' => $kebab->id, 'address' => 'New Address']);
    }

    public function testAdminCanDeleteAKebab(): void
    {
        $kebab = Kebab::factory()->create();

        $response = $this->actingAs($this->admin)->deleteJson("/api/kebabs/{$kebab->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('kebabs', ['id' => $kebab->id]);
    }

    public function testAdminCanUpdateKebabCoordinates(): void
    {
        $kebab = Kebab::factory()->create();
        $payload = ['coordinates' => [['lat' => 51.0, 'lng' => 21.0]]];

        $response = $this->actingAs($this->admin)->putJson("/api/kebabs/{$kebab->id}/coordinates", $payload);

        $response->assertStatus(200);
        $this->assertDatabaseHas('kebabs', ['id' => $kebab->id, 'coordinates' => json_encode($payload['coordinates'])]);
    }



    public function testAdminCanUpdateKebabStatus(): void
    {
        $kebab = Kebab::factory()->create();
        $payload = ['status' => 'closed'];

        $response = $this->actingAs($this->admin)->putJson("/api/kebabs/{$kebab->id}/status", $payload);

        $response->assertStatus(200);
        $this->assertDatabaseHas('kebabs', ['id' => $kebab->id, 'status' => 'closed']);
    }



    public function testAdminCanUpdateKebabOpeningYear(): void
    {
        $kebab = Kebab::factory()->create();

        $response = $this->actingAs($this->admin)->putJson("/api/kebabs/{$kebab->id}/opening-year", [
            'opening_year' => 2000,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('kebabs', [
            'id' => $kebab->id,
            'opening_year' => 2000,
        ]);
    }

    public function testAdminCanUpdateKebabClosingYear(): void
    {
        $kebab = Kebab::factory()->create();

        $response = $this->actingAs($this->admin)->putJson("/api/kebabs/{$kebab->id}/closing-year", [
            'closing_year' => 2023,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('kebabs', [
            'id' => $kebab->id,
            'closing_year' => 2023,
        ]);
    }

    public function testAdminCanUpdateKebabIsCrafted(): void
    {
        $kebab = Kebab::factory()->create();

        $response = $this->actingAs($this->admin)->putJson("/api/kebabs/{$kebab->id}/is-crafted", [
            'is_crafted' => true,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('kebabs', [
            'id' => $kebab->id,
            'is_crafted' => true,
        ]);
    }

    public function testAdminCanUpdateKebabIsPremises(): void
    {
        $kebab = Kebab::factory()->create();

        $response = $this->actingAs($this->admin)->putJson("/api/kebabs/{$kebab->id}/is-premises", [
            'is_premises' => true,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('kebabs', [
            'id' => $kebab->id,
            'is_premises' => true,
        ]);
    }

    public function testAdminCanUpdateKebabIsChainstore(): void
    {
        $kebab = Kebab::factory()->create();

        $response = $this->actingAs($this->admin)->putJson("/api/kebabs/{$kebab->id}/is-chainstore", [
            'is_chainstore' => true,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('kebabs', [
            'id' => $kebab->id,
            'is_chainstore' => true,
        ]);
    }

}
