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
        Schema::create('exercise_training', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exercise_id')->constrained()->onDelete('cascade');
            $table->foreignId('training_id')->constrained()->onDelete('cascade');
            $table->integer('series');
            $table->integer('repetitions');
            $table->integer('rest');
            $table->integer('comments');
            $table->timestamps();

            // Indexes
            $table->index('exercise_id');
            $table->index('training_id');
        
            // Unique constraints
            $table->unique(['exercise_id', 'training_id']); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercise_training');
    }
};
