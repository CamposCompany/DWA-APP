<?php

namespace App\Services;

use App\Exceptions\NotFoundException;
use Illuminate\Http\JsonResponse;
use App\Repositories\UserTrainingRepository;
use App\Repositories\UserTrainingExerciseRepository;
use App\Repositories\UserTrainingExerciseRepetition;

class UserTrainingExerciseService
{
    protected $responseService;
    protected $userTrainingRepository;
    protected $userTrainingExerciseRepository;
    protected $userTrainingExerciseRepetition;

    /**
     * Constructor to inject dependencies.
     *
     * @param TrainingRepository $trainingRepository
     * @param UserTrainingRepository $userTrainingRepository
     * @param UserTrainingExerciseRepository $userTrainingExerciseRepository
     * @param UserTrainingExerciseRepetition $userTrainingExerciseRepetition
     * @param ResponseService $responseService
     */
    public function __construct(ResponseService $responseService, UserTrainingRepository $userTrainingRepository, UserTrainingExerciseRepository $userTrainingExerciseRepository, UserTrainingExerciseRepetition $userTrainingExerciseRepetition) {
        $this->responseService = $responseService;
        $this->userTrainingRepository = $userTrainingRepository;
        $this->userTrainingExerciseRepository = $userTrainingExerciseRepository;
        $this->userTrainingExerciseRepetition = $userTrainingExerciseRepetition;
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
        $training = $this->userTrainingRepository->findById($trainingId);
        if (!$training) throw new NotFoundException('Treino');

        foreach ($exercises as $exercise) {
            $data = [
                'user_trainingID' => $trainingId,
                'exercise_id' => $exercise['exercise_id'],
                'series' => $exercise['series'],
                'rest' => $exercise['rest'],
                'comments' => $exercise['comments'],
                'weight' => $exercise['weight'],
            ];

            $exerciseOnTraining = $this->userTrainingExerciseRepository->create($data);

            for ($i = 0; $i < $exercise['series']; $i++) {

                $repetitionData = [
                    'training_exerciseID' => $exerciseOnTraining->id,
                    'repetitions' => $exercise['repetitions']
                ];

                $this->userTrainingExerciseRepository->createRepetitions($repetitionData);
            }
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
        $training = $this->userTrainingRepository->findById($trainingId);
        if (!$training) throw new NotFoundException('Treino');

        $exerciseOnTraining = $this->userTrainingExerciseRepository->findByTrainingAndExercise($exerciseId, $trainingId);
        if (!$exerciseOnTraining) throw new NotFoundException('Exercício não vinculado ao treino');

        $this->userTrainingExerciseRepository->delete($exerciseOnTraining);

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
        $training = $this->userTrainingRepository->findById($trainingId);
        if (!$training) throw new NotFoundException('Treino');

        $exerciseOnTraining = $this->userTrainingExerciseRepository->findByTrainingAndExercise($trainingId, $exerciseId);
        if (!$exerciseOnTraining) throw new NotFoundException('Exercício não vinculado ao treino');

        if (isset($data["series"])) {
            $repetitions = !empty($data['repetitions'])
                ? $data['repetitions']
                : $this->userTrainingExerciseRepetition->findByExerciseId($exerciseOnTraining->id)->repetition;

            $existingRepetitions = $this->userTrainingExerciseRepetition->findAllByExerciseId($exerciseOnTraining->id);
            $existingCount = count($existingRepetitions);

            if ($existingCount > $data['series']) {
                $quantityToDelete = $existingCount - $data['series'];
                $this->userTrainingExerciseRepetition->deleteLastRepetitions($exerciseOnTraining->id, $quantityToDelete);
            } elseif ($existingCount < $data['series']) {
                $repetitionData = [
                    'training_exerciseID' => $exerciseOnTraining->id,
                    'repetitions' => $repetitions
                ];
                // print_r($repetitionData);die;
                for ($i = $existingCount; $i < $data['series']; $i++) {
                    $this->userTrainingExerciseRepetition->create($repetitionData);
                }
            }
        }

        $this->userTrainingExerciseRepository->update($exerciseOnTraining, $data);

        return $this->responseService->success('Exercício atualizado', $exerciseOnTraining);
    }

    /**
     * Update the series of an exercise from a training session.
     *
     * @param int $exerciseId
     * @param int $repetitionId
     * @param array $data
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function updateExerciseSerieRepetition(int $exerciseId, int $repetitionId, array $data): JsonResponse {
        $exerciseOnTraining = $this->userTrainingExerciseRepository->findById($exerciseId);
        if (!$exerciseOnTraining) throw new NotFoundException('Exercício não vinculado ao treino');
        
        $repetition = $this->userTrainingExerciseRepetition->findById($repetitionId);
        if (!$repetition) throw new NotFoundException('Repetição não encontrada');

        $this->userTrainingExerciseRepetition->update($repetition, $data);

        return $this->responseService->success('Repetição atualizada', $repetition);
    }
}
