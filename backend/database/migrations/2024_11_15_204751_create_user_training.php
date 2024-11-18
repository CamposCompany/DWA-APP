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
        Schema::create('user_trainings', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->text('description')->nullable();
            $table->string('category', 100)->index();
            $table->integer('duration')->nullable();
            $table->foreignId('planID')->index()->constrained('user_plan_trainings')->onDelete('cascade');
            $table->foreignId('origin_trainingID')->nullable()->index()->constrained('user_trainings')->onDelete('cascade');
            $table->foreignId('userID')->index()->constrained('users')->onDelete('cascade');
            $table->integer('position')->nullable()->index();
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
        Schema::dropIfExists('user_trainings');
    }
};
