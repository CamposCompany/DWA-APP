<?php
namespace App\Http\Controllers;

use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Requests\User\ForgotPasswordRequestS1;
use App\Http\Requests\User\ForgotPasswordRequestS2;
use App\Http\Requests\User\ResetPasswordRequest;
use App\Services\UserService;
use App\Services\ExceptionHandlerService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    protected $userService;
    protected $exceptionHandlerService;

    /**
     * Constructor to inject dependencies.
     *
     * @param UserService $userService
     * @param ExceptionHandlerService $exceptionHandlerService
     */
    public function __construct(UserService $userService, ExceptionHandlerService $exceptionHandlerService) {
        $this->userService = $userService;
        $this->exceptionHandlerService = $exceptionHandlerService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse {
        return $this->exceptionHandlerService->handle(function () {
            return $this->userService->getAllUsers();
        });
    }

    /**
     * Store a newly created resource in storage.
     */
    public function show(int $id): JsonResponse {
        return $this->exceptionHandlerService->handle(function () use ($id) {
            return $this->userService->getUserById($id);
        });
    }

    /**
     * Display the specified resource.
     */
    public function store(UserStoreRequest $request): JsonResponse {
        return $this->exceptionHandlerService->handle(function () use ($request) {
            return $this->userService->createUser($request->validated());
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, int $id): JsonResponse {
        return $this->exceptionHandlerService->handle(function () use ($request, $id) {
            return $this->userService->updateUser($request->validated(), $id);
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse {
        return $this->exceptionHandlerService->handle(function () use ($id) {
            return $this->userService->deleteUser($id);
        });
    }

    /**
     * First step to recover password.
     */
    public function forgotPasswordStep1(ForgotPasswordRequestS1 $request): JsonResponse {
        return $this->exceptionHandlerService->handle(function () use ($request) {
            return $this->userService->forgotPasswordStep1($request->validated()["document"]);
        });
    }

    /**
     * Second step to recover password.
     */
    public function forgotPasswordStep2(ForgotPasswordRequestS2 $request): JsonResponse {
        return $this->exceptionHandlerService->handle(function () use ($request) {
            return $this->userService->forgotPasswordStep2($request->validated());
        });
    }

    /**
     * Last step to recover password / change the password.
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse {
        return $this->exceptionHandlerService->handle(function () use ($request) {
            return $this->userService->resetPassword($request->validated());
        });
    }
}