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
        Schema::create('user_exercise_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exerciseID')->constrained('user_training_exercises')->onDelete('cascade');
            $table->foreignId('user_trainingID')->constrained('user_trainings')->onDelete('cascade');
            $table->foreignId('userID')->constrained('users')->onDelete('cascade');
            $table->integer('series');
            $table->integer('repetitions');
            $table->float('weight', 8, 2)->nullable();
            $table->boolean('done')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_exercise_logs');
    }
};
