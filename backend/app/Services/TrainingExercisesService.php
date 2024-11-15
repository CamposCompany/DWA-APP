<?php

namespace App\Services;

use App\Exceptions\NotFoundException;
use App\Repositories\TrainingExerciseRepository;
use Illuminate\Http\JsonResponse;
use App\Repositories\TrainingRepository;

class TrainingExercisesService
{
    protected $responseService;
    protected $trainingRepository;
    protected $trainingExerciseRepository;

    /**
     * Constructor to inject dependencies.
     *
     * @param TrainingRepository $trainingRepository
     * @param ResponseService $responseService
     * @param TrainingExerciseRepository $trainingExerciseRepository
     */
    public function __construct(ResponseService $responseService, TrainingRepository $trainingRepository, TrainingExerciseRepository $trainingExerciseRepository) {
        $this->responseService = $responseService;
        $this->trainingRepository = $trainingRepository;
        $this->trainingExerciseRepository = $trainingExerciseRepository;
    }

    /**
     * Attach exercises to a training session.
     *
     * @param int $trainingId
     * @param array $exercises
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function attachExercises(int $trainingId, array $exercises): JsonResponse {
        $training = $this->trainingRepository->findById($trainingId);
        if (!$training) throw new NotFoundException('Treino');

        foreach ($exercises as $exercise) {
            $data = [
                'training_id' => $trainingId,
                'exercise_id' => $exercise['id'],
                'series' => $exercise['series'],
                'repetitions' => $exercise['repetitions'],
                'rest' => $exercise['rest'],
            ];
            
            $exerciseOnTraining = $this->trainingExerciseRepository->create($data);
        }
        
        return $this->responseService->success('Exercícios vinculados', $exerciseOnTraining);
    }

    /**
     * Detach an exercise from a training session.
     *
     * @param int $trainingId
     * @param int $exerciseId
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function detachExercise(int $trainingId, int $exerciseId): JsonResponse {
        $training = $this->trainingRepository->findById($trainingId);
        if (!$training) throw new NotFoundException('Treino');

        $exerciseOnTraining = $this->trainingExerciseRepository->findByTrainingAndExercise($trainingId, $exerciseId);
        if (!$exerciseOnTraining) throw new NotFoundException('Exercício não vinculado ao treino');

        $this->trainingExerciseRepository->delete($exerciseOnTraining);

        return $this->responseService->success('Exercício desvinculado');
    }

    /**
     * Update an exercise from a training session.
     *
     * @param int $trainingId
     * @param int $exerciseId
     * @param array $data
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function updateExercise(int $trainingId, int $exerciseId, array $data): JsonResponse {
        $training = $this->trainingRepository->findById($trainingId);
        if (!$training) throw new NotFoundException('Treino');

        $exerciseOnTraining = $this->trainingExerciseRepository->findByTrainingAndExercise($trainingId, $exerciseId);
        if (!$exerciseOnTraining) throw new NotFoundException('Exercício não vinculado ao treino');

        $this->trainingExerciseRepository->update($exerciseOnTraining, $data);

        return $this->responseService->success('Exercício atualizado', $exerciseOnTraining);
    }
}
