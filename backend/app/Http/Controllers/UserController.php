<?php
namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\ForgotPasswordRequestS1;
use App\Http\Requests\ForgotPasswordRequestS2;
use App\Http\Requests\ResetPasswordRequest;

use Illuminate\Http\JsonResponse;
use App\Services\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }

    public function index(): JsonResponse {
        return $this->userService->getAllUsers();
    }

    public function show(int $id): JsonResponse {
        return $this->userService->getUserById($id);
    }

    public function store(UserStoreRequest $request): JsonResponse {
        return $this->userService->createUser($request->validated());
    }

    public function update(UserUpdateRequest $request, int $id): JsonResponse {
        return $this->userService->updateUser($request->validated(), $id);
    }

    public function destroy(int $id): JsonResponse {
        return $this->userService->deleteUser($id);
    }

    public function forgotPasswordStep1(ForgotPasswordRequestS1 $request) :JsonResponse {
        return $this->userService->forgotPasswordStep1($request->validated()["document"]);
    }

    public function forgotPasswordStep2(ForgotPasswordRequestS2 $request) :JsonResponse {
        return $this->userService->forgotPasswordStep2($request->validated());
    }

    public function resetPassword(ResetPasswordRequest $request) :JsonResponse {
        return $this->userService->resetPassword($request);
    }
}