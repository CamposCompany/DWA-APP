<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use App\Repositories\TrainingRepository;

class TrainingService
{
    protected $responseService;
    protected $trainingRepository;

    public function __construct(ResponseService $responseService, TrainingRepository $trainingRepository) {
        $this->responseService = $responseService;
    }

    public function getTrainingById(int $id): JsonResponse {
        $training = $this->trainingRepository->findActiveTrainingById($id);
        if (!$training) throw new TrainingNotFoundException();
        
        return $this->responseService->success('Treinamento encontrado com sucesso.', $training);
    }

    public function createTraining(array $data): JsonResponse {
        $training = $this->trainingRepository->create($data);

        return $this->responseService->success('Treinamento criado com sucesso.', $training, 201);
    }

    public function updateTraining(array $data, int $id): JsonResponse {
        $training = $this->trainingRepository->findActiveTrainingById($id);
        if (!$training) throw new TrainingNotFoundException();
        $this->trainingRepository->update($training, $data);

        return $this->responseService->success('Treinamento atualizado com sucesso.', $training);
    }

    public function deleteTraining(int $id): JsonResponse {
        $training = $this->trainingRepository->findActiveTrainingById($id);

        if (!$training) throw new TrainingNotFoundException();
        
        $this->trainingRepository->softDelete($training);
        return $this->responseService->success('Treinamento removido com sucesso.');
    }
}