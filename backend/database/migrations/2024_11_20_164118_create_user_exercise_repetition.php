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
        Schema::create('user_exercise_repetition', function (Blueprint $table) {
            $table->id();
            $table->foreignId('training_exerciseID')->constrained('user_training_exercises')->onDelete('cascade');
            $table->integer('repetitions')->default(12);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_exercise_repeticion');
    }
};
