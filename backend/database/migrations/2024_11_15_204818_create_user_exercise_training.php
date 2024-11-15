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
        Schema::create('user_exercise_training', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exerciseID')->constrained('exercises')->onDelete('cascade');
            $table->foreignId('user_trainingID')->constrained('user_training')->onDelete('cascade');
            $table->integer('series')->default(1);
            $table->integer('repetitions')->default(1);
            $table->integer('rest')->default(0);
            $table->text('comments')->nullable();
            $table->float('weight')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_exercise_training');
    }
};
