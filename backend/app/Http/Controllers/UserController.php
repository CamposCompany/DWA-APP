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

class UserController extends BaseController
{
    protected $userService;

    /**
     * Constructor to inject dependencies.
     *
     * @param UserService $userService
     * @param ExceptionHandlerService $exceptionHandlerService
     */
    public function __construct(
        UserService $userService,
        ExceptionHandlerService $exceptionHandlerService
    ) {
        parent::__construct($exceptionHandlerService);
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userService->getAllUsers()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userService->getUserById($id)
        );
    }

    /**
     * Display the specified resource.
     *
     * @param UserStoreRequest $request
     * @return JsonResponse
     */
    public function store(UserStoreRequest $request): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userService->createUser($request->validated())
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UserUpdateRequest $request, int $id): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userService->updateUser($request->validated(), $id)
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userService->deleteUser($id)
        );
    }

    /**
     * First step to recover password.
     *
     * @param ForgotPasswordRequestS1 $request
     * @return JsonResponse
     */
    public function forgotPasswordStep1(ForgotPasswordRequestS1 $request): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userService->forgotPasswordStep1($request->validated()["document"])
        );
    }

    /**
     * Second step to recover password.
     *
     * @param ForgotPasswordRequest2 $request
     * @return JsonResponse
     */
    public function forgotPasswordStep2(ForgotPasswordRequestS2 $request): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userService->forgotPasswordStep2 ($request->validated())
        );
    }

    /**
     * Last step to recover password / change the password.
     *
     * @param ResetPasswordRequest $request
     * @return JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userService->resetPassword ($request->validated())
        );
    }
}
