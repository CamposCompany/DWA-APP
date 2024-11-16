<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainingExercises\TrainingAttachExerciseRequest;
use App\Http\Requests\TrainingExercises\TrainingUpdateExerciseRequest;
use App\Services\ExceptionHandlerService;
use App\Services\ExerciseService;
use App\Services\TrainingExercisesService;
use App\Services\TrainingService;

class TrainingExerciseController extends Controller
{
    protected $trainingExercisesService;
    protected $exerciseService;
    protected $exceptionHandlerService;

    /**
     * Constructor to inject dependencies.
     *
     * @param TrainingExercisesService $trainingExercisesService
     * @param ExerciseService $exerciseService
     * @param ExceptionHandlerService $exceptionHandlerService
     */
    public function __construct(TrainingExercisesService $trainingExercisesService, ExerciseService $exerciseService, ExceptionHandlerService $exceptionHandlerService) {
        $this->trainingExercisesService = $trainingExercisesService;
        $this->exerciseService = $exerciseService;
        $this->exceptionHandlerService = $exceptionHandlerService;
    }

    /**
     * Attach exercises to a training.
     *
     * @param int $trainingId
     * @param TrainingAttachExerciseRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function attachExercises(TrainingAttachExerciseRequest $request, string $trainingId) {
        return $this->exceptionHandlerService->handle(function () use ($request, $trainingId) {
            return $this->trainingExercisesService->attachExercises($trainingId, $request->validated()['exercises']);
        });
    }

    /**
     * Detach an exercise from a training.
     *
     * @param int $trainingId
     * @param int $exerciseId
     * @return \Illuminate\Http\JsonResponse
     */
    public function detachExercise(string $trainingId, string $exerciseId) {
        return $this->exceptionHandlerService->handle(function () use ($trainingId, $exerciseId) {
            return $this->trainingExercisesService->detachExercise($trainingId, $exerciseId);
        });
    }

    /**
     * Update an exercise from a training.
     *
     * @param int $trainingId
     * @param int $exerciseId
     * @param TrainingAttachExerciseRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateExercise(TrainingUpdateExerciseRequest $request, string $trainingId, string $exerciseId) {
        return $this->exceptionHandlerService->handle(function () use ($request, $trainingId, $exerciseId) {
            return $this->trainingExercisesService->updateExercise($trainingId, $exerciseId, $request->validated());
        });
    }

}
