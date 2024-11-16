<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('equipment');
            $table->string('category');
            $table->string('image')->nullable();
            $table->string('video')->nullable();
            $table->timestamps();

            // Indexes
            $table->index('name'); 
            $table->index('category');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_exercises');
        Schema::dropIfExists('exercises');
    }
};
