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
            $table->foreignId('exercise_id')->nullable()->constrained('exercises')->onDelete('cascade');
            $table->foreignId('user_trainingID')->constrained('user_trainings')->onDelete('cascade');
            $table->integer('series')->default(3);
            $table->integer('rest')->default(30);
            $table->text('comments')->nullable();
            $table->float('weight')->nullable();
            $table->boolean('active')->default(true);
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
