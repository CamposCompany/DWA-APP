<?php

namespace App\Repositories;

use App\Models\UserExerciseRepetition;

class UserTrainingExerciseRepetition
{

    /**
     * Find a training by id.
     *
     * @param int $id
     * @return UserExerciseRepetition|null
     */
    public function findById(int $id): ?UserExerciseRepetition
    {
        return UserExerciseRepetition::find($id);
    }

    /**
     * Find the first repetition by exercise ID.
     *
     * @param int $id
     * @return UserExerciseRepetition|null
     */
    public function findByExerciseId(int $id): ?UserExerciseRepetition
    {
        return UserExerciseRepetition::where('training_exerciseID', $id)->first();
    }

    /**
     * Create a new exercise to training.
     *
     * @param array $data
     * @return UserExerciseRepetition|null
     */
    public function create(array $data): UserExerciseRepetition
    {
        return UserExerciseRepetition::create($data);
    }

    /**
     * Update an eing execise with new data.
     *
     * @param UserExerciseRepetition $trainingExerciseRepetition
     * @param array $data
     * @return bool
     */
    public function update(UserExerciseRepetition $trainingExerciseRepetition, array $data): bool
    {
        return $trainingExerciseRepetition->update($data);
    }

    /**
     * Delete multiple exercises by their training_exercise_id.
     *
     * @param int $id
     * @return bool
     */
    public function deleteRepetitionsByTrainingExerciseId(int $id): bool
    {
        return UserExerciseRepetition::where('training_exerciseID', $id)->delete();
    }

    /**
     * Delete a single exercise by its ID.
     *
     * @param int $id
     * @return array
     */
    public function findAllByExerciseId(int $id): array
    {
        return UserExerciseRepetition::where('training_exerciseID', $id)->get()->toArray();
    }

    /**
     * Delete a single exercise by its ID.
     *
     * @param int $id
     * @param int $quantity
     * @return void
     */
    public function deleteLastRepetitions(int $id, int $quantity): void
    {
        UserExerciseRepetition::where('training_exerciseID', $id)->latest()->take($quantity)->delete();
    }
}
