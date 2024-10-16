<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::create("suggestions", function (Blueprint $table): void {
            $table->id();
            $table->string("user");
            $table->string("contents");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("suggestions");
    }
};
