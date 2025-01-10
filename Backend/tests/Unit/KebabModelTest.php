<?php

use App\Models\Kebab;

test('mass assignment works correctly', function () {
    $kebab = new Kebab([
        'name' => 'Delicious Kebab',
        'address' => 'Main Street 42',
        'status' => 'open',
    ]);

    expect($kebab->name)->toBe('Delicious Kebab');
    expect($kebab->address)->toBe('Main Street 42');
    expect($kebab->status)->toBe('open');
});

test('casts work correctly', function () {
    $kebab = new Kebab([
        'coordinates' => ['lat' => 50.06, 'lng' => 19.94],
        'sauces' => ['mayo', 'ketchup'],
        'meats' => ['chicken', 'beef'],
    ]);

    expect($kebab->coordinates)->toBe(['lat' => 50.06, 'lng' => 19.94]);
    expect($kebab->sauces)->toBe(['mayo', 'ketchup']);
    expect($kebab->meats)->toBe(['chicken', 'beef']);
});

test('guarded fields cannot be mass assigned', function () {
    $kebab = new Kebab(['id' => 1]);

    expect($kebab->id)->not->toBe(1);
});
