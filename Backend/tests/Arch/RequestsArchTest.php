<?php

declare(strict_types=1);

use Illuminate\Foundation\Http\FormRequest;

arch("Requests should be inside correct folder")
    ->expect('App\Http\Requests')
    ->toBeClasses() 
    ->toHaveSuffix("Request");

arch("Kebab requests should be in thier folder")
    ->expect('App\Http\Requests\KebabRequests')
    ->toBeClasses()
    ->toHaveSuffix("Request");

arch("UserRequests should have proper architecture")
    ->expect('App\Http\Requests\UserRequests')
    ->toBeClasses()
    ->toHaveSuffix("Request")
    ->toExtend(FormRequest::class);
