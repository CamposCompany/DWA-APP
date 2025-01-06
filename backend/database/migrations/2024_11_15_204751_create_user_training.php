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
            $table->foreignId('user_id')->index()->constrained('users')->onDelete('cascade');
            $table->foreignId('origin_trainingID')->nullable()->index()->constrained('trainings')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->string('objective', 100)->nullable();
            $table->integer('position')->nullable();
            $table->boolean('active')->default(true)->index();
            $table->date('start_date')->index();
            $table->date('expire_date')->nullable();
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
