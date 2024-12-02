<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::create("kebabs", function (Blueprint $table): void {
            $table->id();
            $table->binary("logo")->nullable(); 
            $table->string("name");
            $table->string("address"); 
            $table->json("coordinates"); 
            $table->json("sauces"); 
            $table->json("meats"); 
            $table->enum("status", ["exists", "closed", "planned"]); 
            $table->json("opening_hours"); 
            $table->year("opening_year")->nullable(); 
            $table->year("closing_year")->nullable(); 
            $table->boolean("is_crafted"); 
            $table->boolean("is_premises"); 
            $table->boolean("is_chainstore"); 
            $table->json("ordering_options"); 
            $table->json("comments")->nullable(); 
            $table->float("google_reviews", 2, 1)->nullable(); 
            $table->float("pysznepl_reviews", 2, 1)->nullable(); 
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists("kebabs");
    }
};