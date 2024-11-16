<?php

namespace App\Repositories;

use App\Models\Training;
use App\Models\TrainingExercise;

class TrainingExerciseRepository
{
    /**
     * Find a training by id.
     *
     * @param int $id The id of the training
     * @return TrainingExercise
     */
    public function findByTrainingAndExercise(int $trainingId, int $exerciseId): TrainingExercise {
        return TrainingExercise::where('training_id', $trainingId)->where('exercise_id', $exerciseId)->first();
    }

    /**
     * Create a new exercise to training.
     *
     * @param array $data Data for the new training
     * @return TrainingExercise
     */
    public function create(array $data): TrainingExercise {
        return TrainingExercise::create($data);
    }

    /**
     * Update an existing execise with new data.
     *
     * @param TrainingExercise $execise The user to be updated
     * @param array $data The new data to update the training with
     * @return bool
     */
    public function update(TrainingExercise $trainingExercise, array $data): bool {
        return $trainingExercise->update($data);
    }

    /**
     * Delete a execise by id.
     *
     * @param TrainingExercise $execise The execise to be deleted
     * @return bool
     */
    public function delete(TrainingExercise $trainingExercise): bool {
        return $trainingExercise->delete();
    }
}