<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Repositories\UserRepository;
use App\Exceptions\NotFoundException;
use App\Repositories\TrainingRepository;
use App\Repositories\TrainingExerciseRepository;
use App\Repositories\UserTrainingExerciseRepository;
use App\Repositories\UserTrainingRepository;
use Illuminate\Support\Facades\DB;

class UserTrainingService
{

    protected $userRepository;
    protected $responseService;
    protected $trainingRepository;
    protected $userTrainingRepository;
    protected $trainingExerciseRepository;
    protected $userTrainingExerciseRepository;

    /**
     * Constructor to inject dependencies.
     *
     * @param TrainingRepository $trainingRepository
     * @param ResponseService $responseService
     * @param UserTrainingRepository $userTrainingRepository
     * @param userRepository $userRepository
     * @param TrainingExerciseRepository $trainingExerciseRepository
     * @param UserTrainingExerciseRepository $trainingExerciseRepository
     */
    public function __construct(ResponseService $responseService, TrainingRepository $trainingRepository, UserTrainingRepository $userTrainingRepository, userRepository $userRepository, TrainingExerciseRepository $trainingExerciseRepository, UserTrainingExerciseRepository $userTrainingExerciseRepository) {
        $this->responseService = $responseService;
        $this->trainingRepository = $trainingRepository;
        $this->userTrainingRepository = $userTrainingRepository;
        $this->userRepository = $userRepository;
        $this->trainingExerciseRepository = $trainingExerciseRepository;
        $this->userTrainingExerciseRepository = $userTrainingExerciseRepository;
    }

    public function getUserTrainingById($id): JsonResponse {
        $user = $this->userRepository->findUserById($id);
        if (!$user) throw new NotFoundException('Usuário');

        $trainings = $this->userTrainingRepository->findById($id);

        return $this->responseService->success('Treinos encontrados', $trainings);
    }

    public function createTrainingToUser($data): JsonResponse {
        $user = $this->userRepository->findUserById($data['user_id']);
        if (!$user) throw new NotFoundException('Usuário');

        $training = $this->trainingRepository->findById($data['training_id']);
        if (!$training) throw new NotFoundException('Treino');

        if ($user->userTrainings()->where('origin_trainingID', $training->id)->exists()) {
            return $this->responseService->error('Usuário já possui este treino', 400);
        }

        DB::transaction(function() use ($data, $user, $training) {

            $userTrainingData = [
                'name' => $training->name,
                'description' => $training->description,
                'objective' => $training->objective,
                'origin_trainingID' => $training->id,
                'user_id' => $user->id,
                'start_date' => $data['start_date'],
                'expire_date' => $data['expire_date']
            ];
    
            $userTraining = $this->userTrainingRepository->create($userTrainingData);

            $exercises = $this->trainingExerciseRepository->findByTrainingId($training->id);

            foreach ($exercises as $exercise) {
                $exerciseData = [
                    'user_trainingID' => $userTraining->id,
                    'exercise_id' => $exercise->exercise_id,
                    'series' => $exercise->series,
                    'rest' => $exercise->rest
                ];

                $userTrainingExercise = $this->userTrainingExerciseRepository->create($exerciseData);

                for ($i = 0; $i < $exercise->series; $i++) {
                    $repetitionData = [
                        'training_exerciseID' => $userTrainingExercise->id,
                        'repetitions' => $exercise->repetitions
                    ];

                    $this->userTrainingExerciseRepository->createRepetitions($repetitionData);
                }
            }
        });

        return $this->responseService->success('Treino vinculado ao usuário');
    }

    public function updateUserTraining($data, $id): JsonResponse {
        $user = $this->userRepository->findUserById($data['user_id']);
        if (!$user) throw new NotFoundException('Usuário');

        $training = $this->userTrainingRepository->findById($id);
        if (!$training) throw new NotFoundException('Treino');

        $this->userTrainingRepository->update($training, $data);

        return $this->responseService->success('Treino atualizado');
    }

    public function deleteUserTraining(int $id): JsonResponse {
        $training = $this->userTrainingRepository->findById($id);
        if (!$training) throw new NotFoundException('Treino');

        $this->userTrainingRepository->delete($training);

        return $this->responseService->success('Treino desvinculado do usuário');
    }
}

                                   