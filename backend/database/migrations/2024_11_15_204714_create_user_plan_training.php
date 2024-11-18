<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('user_plan_trainings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userID')->index()->constrained('users')->onDelete('cascade');
            $table->text('comments')->nullable();
            $table->string('objective', 100)->nullable()->index();
            $table->boolean('active')->default(true);
            $table->date('start_date')->index();
            $table->date('expire_date')->nullable()->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_plan_trainings');
    }
};
