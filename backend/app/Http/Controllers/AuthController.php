<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use App\Services\AuthService;
class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService) {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request) {
        return $this->authService->login($request->validated());
    }

    public function logout() :JsonResponse {
        return $this->authService->logout();
    }
}
