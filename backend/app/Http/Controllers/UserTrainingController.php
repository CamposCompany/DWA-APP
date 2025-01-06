<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserTraining\UserTrainingStoreRequest;
use App\Http\Requests\UserTraining\UserTrainingUpdateRequest;
use App\Services\UserTrainingService;
use Illuminate\Http\JsonResponse;
use App\Services\ExceptionHandlerService;

class UserTrainingController extends BaseController
{
    protected UserTrainingService $userTrainingService;

    /**
     * Constructor to inject dependencies.
     *
     * @param UserTrainingService $userTrainingService
     * @param ExceptionHandlerService $exceptionHandlerService
     */
    public function __construct(UserTrainingService $userTrainingService, ExceptionHandlerService $exceptionHandlerService)
    {
        parent::__construct($exceptionHandlerService);
        $this->userTrainingService = $userTrainingService;
    }

    /**
     * Show a user training by ID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userTrainingService->getUserTrainingById($id)
        );
    }

    /**
     * Store a new user training
     *
     * @param UserTrainingStoreRequest $request
     * @return JsonResponse
     */
    public function store(UserTrainingStoreRequest $request): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userTrainingService->createTrainingToUser($request->validated())
        );
    }

    /**
     * Update a user training
     *
     * @param UserTrainingUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UserTrainingUpdateRequest $request, int $id): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userTrainingService->updateUserTraining($request->validated(), $id)
        );
    }

    /**
     * Delete a user training
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userTrainingService->deleteUserTraining($id)
        );
    }
}
