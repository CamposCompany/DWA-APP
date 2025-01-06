<?php

namespace App\Repositories;

use App\Models\UserTrainingExercise;
use App\Models\UserExerciseRepetition;

class UserTrainingExerciseRepository
{

    /**
     * Find a training by id.
     *
     * @param int $id
     * @return UserTrainingExercise|null
     */
    public function findById(int $id): ?UserTrainingExercise {
        return UserTrainingExercise::find($id);
    }

    /**
     * Find a training by id and excerciseID.
     *
     * @param int $trainingId
     * @param int $exerciseId
     * @return UserTrainingExercise|null
     */
    public function findByTrainingAndExercise(int $exerciseId, int $trainingId): ?UserTrainingExercise {
        return UserTrainingExercise::where('exercise_id', $exerciseId)->where('user_trainingID', $trainingId)->first();
    }

    /**
     * Create a new exercise to training.
     *
     * @param array $data
     * @return UserTrainingExercise
     */
    public function create(array $data): UserTrainingExercise {
        return UserTrainingExercise::create($data);
    }

    /**
     * Update an existing execise with new data.
     *
     * @param UserTrainingExercise $execise
     * @param array $data
     * @return bool
     */
    public function update(UserTrainingExercise $trainingExercise, array $data): bool {
        return $trainingExercise->update($data);
    }

    /**
     * Delete a execise by id.
     *
     * @param TrainingExercise $trainingExercise
     * @return bool
     */
    public function delete(UserTrainingExercise $trainingExercise): bool {
        return $trainingExercise->delete();
    }

    /**
     * Create repetitions to user exercise.
     *
     * @param array $data
     * @return bool
     */
    public function createRepetitions(array $data): UserExerciseRepetition {
        return UserExerciseRepetition::create($data);
    }
}
