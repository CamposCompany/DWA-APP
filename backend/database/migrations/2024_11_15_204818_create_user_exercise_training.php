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
        Schema::create('user_training_exercises', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exerciseID')->constrained('user_training_exercises')->onDelete('cascade');
            $table->foreignId('user_trainingID')->constrained('user_trainings')->onDelete('cascade');
            $table->integer('series')->default(1);
            $table->integer('repetitions')->default(1);
            $table->integer('rest')->default(0);
            $table->text('comments')->nullable();
            $table->float('weight')->nullable();
            $table->boolean('active')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_training_exercises');
    }
};
