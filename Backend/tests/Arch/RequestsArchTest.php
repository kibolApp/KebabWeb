<?php

arch('Requests should be inside correct folder')
    ->expect('App\Http\Requests')
    ->toBeClasses() 
    ->toHaveSuffix('Request');

arch('Kebab requests should be in thier folder')
    ->expect('App\Http\Requests\KebabRequests')
    ->toBeClasses()
    ->toHaveSuffix('Request');

arch('UserRequests should have proper architecture')
    ->expect('App\Http\Requests\UserRequests')
    ->toBeClasses()
    ->toHaveSuffix('Request')
    ->toExtend(\Illuminate\Foundation\Http\FormRequest::class); 