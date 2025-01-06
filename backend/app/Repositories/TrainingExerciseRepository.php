<?php

namespace App\Repositories;

use App\Models\TrainingExercise;

class TrainingExerciseRepository
{
    /**
     * Find a training by id and excerciseID.
     *
     * @param int $trainingID
     * @param int $exerciseID
     * @return TrainingExercise|null
     */
    public function findByTrainingAndExercise(int $trainingID, int $exerciseID): TrainingExercise
    {
        return TrainingExercise::where('training_id', $trainingID)->where('exercise_id', $exerciseID)->first();
    }

    /**
     * Find a training by id.
     *
     * @param int $id
     * @return TrainingExercise|null
     */
    public function findByTrainingId(int $id): TrainingExercise
    {
        return TrainingExercise::where('training_id', $id)->get();
    }

    /**
     * Create a new exercise to training.
     *
     * @param array $data
     * @return TrainingExercise|null
     */
    public function create(array $data): TrainingExercise
    {
        return TrainingExercise::create($data);
    }

    /**
     * Update an existing execise with new data.
     *
     * @param TrainingExercise $trainingExercise The user to be updated
     * @param array $data The new data to update the training with
     * @return bool
     */
    public function update(TrainingExercise $trainingExercise, array $data): bool
    {
        return $trainingExercise->update($data);
    }

    /**
     * Delete a execise by id.
     *
     * @param TrainingExercise $trainingExercise The execise to be deleted
     * @return bool
     */
    public function delete(TrainingExercise $trainingExercise): bool
    {
        return $trainingExercise->delete();
    }
}
