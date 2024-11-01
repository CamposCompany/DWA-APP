<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Controllers
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/users', UserController::class);
    Route::post('/reset-password', [UserController::class, 'resetPassword']);
    
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/forgot-password-step1', [UserController::class, 'forgotPasswordStep1']);
Route::post('/forgot-password-step2', [UserController::class, 'forgotPasswordStep2']);

