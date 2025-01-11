<?php

arch('Models should be inside correct folder')
    ->expect('App\Models')
    ->toBeClasses()
    ->toHaveSuffix('')
    ->toExtend(\Illuminate\Database\Eloquent\Model::class);

arch('Kebab model should follow conventions')
    ->expect('App\Models\Kebab')
    ->toBeClasses();
