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
        Schema::create('user_log_exercise', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exerciseID')->constrained('exercises')->onDelete('cascade');
            $table->foreignId('user_trainingID')->constrained('user_training')->onDelete('cascade');
            $table->foreignId('userID')->constrained('users')->onDelete('cascade');
            $table->date('date');
            $table->float('weight')->nullable();
            $table->boolean('done')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_log_exercise');
    }
};
