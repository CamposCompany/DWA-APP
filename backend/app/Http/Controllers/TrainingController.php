<?php

namespace App\Http\Controllers;

use App\Http\Requests\Training\TrainingStoreRequest;
use App\Http\Requests\Training\TrainingUpdateRequest;
use App\Services\ExceptionHandlerService;
use App\Services\TrainingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TrainingController extends BaseController
{
    protected TrainingService $trainingService;

    public function __construct(TrainingService $trainingService, ExceptionHandlerService $exceptionHandler)
    {
        parent::__construct($exceptionHandler);
        $this->trainingService = $trainingService;
    }

    /**
     * Get all trainings
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->trainingService->getAll($request)
        );
    }

    /**
     * Store a new training
     *
     * @param TrainingStoreRequest $request
     * @return JsonResponse
     */
    public function store(TrainingStoreRequest $request): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->trainingService->create($request->validated())
        );
    }

    /**
     * Get a training by ID
     *
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->trainingService->getById($id)
        );
    }

    /**
     * Update a training
     *
     * @param TrainingUpdateRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(TrainingUpdateRequest $request, string $id): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->trainingService->update($request->all(), $id)
        );
    }

    /**
     * Delete a training
     *
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->trainingService->delete($id)
        );
    }
}
