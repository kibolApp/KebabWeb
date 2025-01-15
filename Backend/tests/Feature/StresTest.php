<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

    test('API handles multiple requests under load', function () {
    $iterations = 100;

    for ($i = 0; $i < $iterations; $i++) {
        $response = $this->getJson('/api/kebabs');

        expect(in_array($response->status(), [200, 429]))
            ->toBeTrue("Unexpected status: {$response->status()}");
    }
});
    test('API rate limits requests correctly', function () {
    $iterations = 100;
    $successfulResponses = 0;
    $rateLimitResponses = 0;

    for ($i = 0; $i < $iterations; $i++) {
        $response = $this->getJson('/api/kebabs');

        if ($response->status() === 200) {
            $successfulResponses++;
        } elseif ($response->status() === 429) {
            $rateLimitResponses++;
        }
    }

    expect($successfulResponses)->toBeGreaterThan(0);
    expect($rateLimitResponses)->toBeGreaterThan(0);
});
