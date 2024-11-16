<?php
namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use App\Services\AuthService;
use App\Services\ExceptionHandlerService;

class AuthController extends Controller
{
    protected $authService;
    protected $exceptionHandlerService;

    public function __construct(AuthService $authService, ExceptionHandlerService $exceptionHandlerService) {
        $this->authService = $authService;
        $this->exceptionHandlerService = $exceptionHandlerService;
    }

    public function login(LoginRequest $request): JsonResponse {
        return $this->exceptionHandlerService->handle(function () use ($request) {
            return $this->authService->login($request->validated());
        });
    }

    public function logout(): JsonResponse {
        return $this->exceptionHandlerService->handle(function () {
            return $this->authService->logout();
        });
    }
}