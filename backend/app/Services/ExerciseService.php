<?php
namespace App\Services;

use App\Exceptions\NotFoundException;
use App\Repositories\ExerciseRepository;
use Illuminate\Http\JsonResponse;
use App\Services\ResponseService;

class ExerciseService
{
    protected $exerciseRepository;
    protected $responseService;

    /**
     * Constructor to inject dependencies.
     *
     * @param ExerciseRepository $exerciseRepository
     * @param ResponseService $responseService
     */
    public function __construct(ExerciseRepository $exerciseRepository, ResponseService $responseService) {
        $this->exerciseRepository = $exerciseRepository;
        $this->responseService = $responseService;
    }

    /**
     * Retrieve all exercises with pagination.
     *
     * @return JsonResponse
     */
    public function getAllExercises(): JsonResponse {
        $exercises = $this->exerciseRepository->paginatedAllExercises();
        
        $customData = [
            'current_page' => $exercises->currentPage(),
            'exercises' => $exercises->items(),
            'total' => $exercises->total(),
            'per_page' => $exercises->perPage(),
            'last_page' => $exercises->lastPage(),
            'next_page_url' => $exercises->nextPageUrl(),
            'prev_page_url' => $exercises->previousPageUrl()
        ];

        return $this->responseService->success('Exercícios encontrados', $customData);
    }

    /**
     * Retrieve an exercise by its ID.
     *
     * @param int $id
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function getExerciseById(int $id): JsonResponse {
        $exercise = $this->exerciseRepository->findExerciseById($id);
        
        if (!$exercise) throw new NotFoundException();
        
        return $this->responseService->success('Exercício encontrado', $exercise);
    }

    /**
     * Create a new exercise.
     *
     * @param array $data
     * @return JsonResponse
     */
    public function createUser(array $data): JsonResponse {
        $exercise = $this->exerciseRepository->create($data);
        return $this->responseService->success('Exercício criado', $exercise, 201);
    }

    /**
     * Update an existing exercise.
     *
     * @param array $data
     * @param int $id
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function updateUser(array $data, int $id): JsonResponse {
        $exercise = $this->exerciseRepository->findExerciseById($id);
        
        if (!$exercise) throw new NotFoundException();
        
        $this->exerciseRepository->update($exercise, $data);
        return $this->responseService->success('Exercício atualizado', $exercise);
    }

    /**
     * Delete an exercise by its ID.
     *
     * @param int $id
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function deleteUser(int $id): JsonResponse {
        $exercise = $this->exerciseRepository->findExerciseById($id);

        if (!$exercise) throw new NotFoundException();
        
        $this->exerciseRepository->delete($exercise);
        return $this->responseService->success('Exercício removido');
    }
}