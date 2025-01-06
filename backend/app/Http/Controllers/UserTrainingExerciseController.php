<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserTrainingExercises\UserTrainingExerciseStoreRequest;
use App\Http\Requests\UserTrainingExercises\UserTrainingExerciseUpdateRequest;
use App\Http\Requests\UserTrainingExercises\UserTrainingExerciseSerieUpdateRequest;
use App\Services\ExceptionHandlerService;
use App\Services\UserTrainingExerciseService;
use Illuminate\Http\JsonResponse;

class UserTrainingExerciseController extends BaseController
{
    protected UserTrainingExerciseService $userTrainingExerciseService;

    /**
     * Constructor to inject dependencies.
     *
     * @param UserTrainingExerciseService $userTrainingExerciseService
     * @param ExceptionHandlerService $exceptionHandlerService
     */
    public function __construct(
        UserTrainingExerciseService $userTrainingExerciseService, ExceptionHandlerService $exceptionHandlerService
    ) {
        parent::__construct($exceptionHandlerService);
        $this->userTrainingExerciseService = $userTrainingExerciseService;
    }

    /**
     * Attach exercises to a training.
     *
     * @param UserTrainingExerciseStoreRequest $request
     * @param string $trainingId
     * @return JsonResponse
     */
    public function attachExercises(UserTrainingExerciseStoreRequest $request, string $trainingId): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userTrainingExerciseService->attachExercises($trainingId, $request->validated()['exercises'])
        );
    }

    /**
     * Detach an exercise from a training.
     *
     * @param string $trainingId
     * @param string $exerciseId
     * @return JsonResponse
     */
    public function detachExercise(string $trainingId, string $exerciseId): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userTrainingExerciseService->detachExercise($trainingId, $exerciseId)
        );
    }

    /**
     * Update an exercise from a training.
     *
     * @param string $trainingId
     * @param string $exerciseId
     * @param UserTrainingExerciseUpdateRequest $request
     * @return JsonResponse
     */
    public function updateExercise(UserTrainingExerciseUpdateRequest $request, string $trainingId, string $exerciseId): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userTrainingExerciseService->updateExercise($trainingId, $exerciseId, $request->validated())
        );
    }

    /**
     * Update the repetition of an exercise series.
     *
     * @param UserTrainingExerciseSerieUpdateRequest $request
     * @param string $exerciseId
     * @param string $repetitionId
     * @return JsonResponse
     */
    public function updateSeriesRepetition(UserTrainingExerciseSerieUpdateRequest $request, string $exerciseId, string $repetitionId): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->userTrainingExerciseService->updateExerciseSerieRepetition($exerciseId, $repetitionId, $request->validated())
        );
    }
}
