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
        Schema::create('user_training', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('category');
            $table->integer('duration')->nullable();
            $table->foreignId('plan_ID')->constrained('user_plan_training')->onDelete('cascade');
            $table->foreignId('origin_training')->nullable()->constrained('user_training')->onDelete('cascade');
            $table->foreignId('userID')->constrained('users')->onDelete('cascade');
            $table->integer('position')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_training');
    }
};
