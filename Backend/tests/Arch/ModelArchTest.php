<?php

declare(strict_types=1);

use App\Models\Kebab;
use Illuminate\Database\Eloquent\Model;

arch("Models should be inside correct folder")
    ->expect('App\Models')
    ->toBeClasses()
    ->toHaveSuffix("")
    ->toExtend(Model::class);

arch("Kebab model should follow conventions")
    ->expect(Kebab::class)
    ->toBeClasses();
