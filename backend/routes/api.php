<?php

use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\TrainingExerciseController;
use App\Http\Controllers\UserController;

// Auth routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('auth.logout');
    
    Route::post('/reset-password', [UserController::class, 'resetPassword'])->name('auth.reset-password');
    Route::post('/forgot-password-step1', [UserController::class, 'forgotPasswordStep1'])->name('auth.forgot-password-step1');
    Route::post('/forgot-password-step2', [UserController::class, 'forgotPasswordStep2'])->name('auth.forgot-password-step2');
});

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/users', UserController::class)->names([
        'index' => 'users.index',
        'store' => 'users.store',
        'show' => 'users.show',
        'update' => 'users.update',
        'destroy' => 'users.destroy',
    ]);
    
    Route::apiResource('/exercises', ExerciseController::class)->names([
        'index' => 'exercises.index',
        'store' => 'exercises.store',
        'show' => 'exercises.show',
        'update' => 'exercises.update',
        'destroy' => 'exercises.destroy',
    ]);

    Route::apiResource('/trainings', TrainingController::class)->names([
        'index' => 'trainings.index',
        'store' => 'trainings.store',
        'show' => 'trainings.show',
        'update' => 'trainings.update',
        'destroy' => 'trainings.destroy',
    ]);
    Route::prefix('trainings')->group(function () {
        Route::post('{training}/exercises', [TrainingExerciseController::class, 'attachExercises'])->name('training.exercises.attach');
        Route::delete('{training}/exercises/{exercise}', [TrainingExerciseController::class, 'detachExercise'])->name('training.exercises.detach');
        Route::put('{training}/exercises/{exercise}', [TrainingExerciseController::class, 'updateExercise'])->name('training.exercises.update');
    });
});
 