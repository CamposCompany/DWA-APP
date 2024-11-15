<?php

namespace App\Services;

use App\Exceptions\NotFoundException;
use App\Repositories\TrainingExerciseRepository;
use Illuminate\Http\JsonResponse;
use App\Repositories\TrainingRepository;

class TrainingService
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
     * Retrieve all training sessions with pagination.
     *
     * @return JsonResponse
     */
    public function getAll(): JsonResponse {
        $exercises = $this->trainingRepository->paginatedAll();
        
        $customData = [
            'current_page' => $exercises->currentPage(),
            'trainings' => $exercises->items(),
            'total' => $exercises->total(),
            'per_page' => $exercises->perPage(),
            'last_page' => $exercises->lastPage(),
            'next_page_url' => $exercises->nextPageUrl(),
            'prev_page_url' => $exercises->previousPageUrl()
        ];

        return $this->responseService->success('Treinos encontrados', $customData);
    }

    /**
     * Retrieve a training session by its ID.
     *
     * @param int $id
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function getById(int $id): JsonResponse {
        $training = $this->trainingRepository->findById($id);
        if (!$training) throw new NotFoundException('Treino');
        
        return $this->responseService->success('Treino encontrado', $training);
    }

    /**
     * Create a new training session.
     *
     * @param array $data
     * @return JsonResponse
     */
    public function create(array $data): JsonResponse {
        $training = $this->trainingRepository->create($data);

        return $this->responseService->success('Treino criado', $training, 201);
    }

    /**
     * Update an existing training session.
     *
     * @param array $data
     * @param int $id
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function update(array $data, int $id): JsonResponse {
        $training = $this->trainingRepository->findById($id);
        if (!$training) throw new NotFoundException('Treino');
        
        $this->trainingRepository->update($training, $data);
        return $this->responseService->success('Treino atualizado', $training);
    }

    /**
     * Delete a training session by its ID.
     *
     * @param int $id
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function delete(int $id): JsonResponse {
        $training = $this->trainingRepository->findById($id);
        if (!$training) throw new NotFoundException('Treino');
        
        $this->trainingRepository->delete($training);
        return $this->responseService->success('Treino removido');
    }
}
