<?php

namespace App\Repositories;

use App\Models\Exercise;

class ExerciseRepository
{
    /**
     * Retrieve all exercises with pagination.
     *
     * @param int $perPage Number of exercises per page (default is 50)
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function paginatedAllExercises(int $perPage = 50) {
        return Exercise::paginate($perPage);
    }

    /**
     * Find an exercise by its ID.
     *
     * @param int $id Exercise's ID
     * @return Exercise|null
     */
    public function findExerciseById(int $id): ?Exercise {
        return Exercise::where('id', $id)->first();
    }

    /**
     * Find an active exercise by its ID. Active exercises are those that are not soft deleted.
     *
     * @param int $id Exercise's ID
     * @return Exercise|null
     */
    public function findActiveExerciseById(int $id): ?Exercise {
        return Exercise::where('id', $id)->whereNull('deleted_at')->first();
    }

    /**
     * Create a new exercise.
     *
     * @param array $data Data for the new exercise
     * @return Exercise
     */
    public function create(array $data): Exercise {
        return Exercise::create($data);
    }

    /**
     * Update an existing exercise with new data.
     *
     * @param Exercise $exercise The exercise to be updated
     * @param array $data The new data to update the exercise with
     * @return bool
     */
    public function update(Exercise $exercise, array $data): bool {
        return $exercise->update($data);
    }

    /**
     * Soft delete an exercise by marking it as deleted (setting 'deleted_at' field).
     *
     * @param Exercise $exercise The exercise to be soft deleted
     * @return bool
     */
    public function delete(Exercise $exercise): bool {
        return $exercise->delete();
    }
}
