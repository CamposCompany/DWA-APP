<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainingExercises\TrainingAttachExerciseRequest;
use App\Http\Requests\TrainingExercises\TrainingUpdateExerciseRequest;
use Illuminate\Http\JsonResponse;
use App\Services\ExceptionHandlerService;
use App\Services\ExerciseService;
use App\Services\TrainingExercisesService;

class TrainingExerciseController extends BaseController
{
    protected $trainingExercisesService;
    protected $exerciseService;

    /**
     * Constructor to inject dependencies.
     *
     * @param TrainingExercisesService $trainingExercisesService
     * @param ExerciseService $exerciseService
     * @param ExceptionHandlerService $exceptionHandlerService
     */
    public function __construct(
        TrainingExercisesService $trainingExercisesService,
        ExerciseService $exerciseService,
        ExceptionHandlerService $exceptionHandlerService
    ) {
        parent::__construct($exceptionHandlerService);
        $this->trainingExercisesService = $trainingExercisesService;
        $this->exerciseService = $exerciseService;
    }

    /**
     * Attach exercises to a training.
     *
     * @param int $trainingId
     * @param TrainingAttachExerciseRequest $request
     * @return JsonResponse
     */
    public function attachExercises(TrainingAttachExerciseRequest $request, string $trainingId): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->trainingExercisesService->attachExercises($trainingId, $request->validated()['exercises'])
        );
    }

    /**
     * Detach an exercise from a training.
     *
     * @param int $trainingId
     * @param int $exerciseId
     * @return JsonResponse
     */
    public function detachExercise(string $trainingId, string $exerciseId) {
        return $this->handleRequest(fn () =>
            $this->trainingExercisesService->detachExercise($trainingId, $exerciseId)
        );
    }

    /**
     * Update an exercise from a training.
     *
     * @param int $trainingId
     * @param int $exerciseId
     * @param TrainingAttachExerciseRequest $request
     * @return JsonResponse
     */
    public function updateExercise(TrainingUpdateExerciseRequest $request, string $trainingId, string $exerciseId): JsonResponse
    {
        return $this->handleRequest(fn () =>
            $this->trainingExercisesService->updateExercise($trainingId, $exerciseId, $request->validated())
        );
    }

}
