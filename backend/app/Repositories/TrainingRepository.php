<?php

namespace App\Repositories;

use App\Models\Training;

use Illuminate\Pagination\LengthAwarePaginator;

class TrainingRepository
{
    /**
     * Retrieve all trainings with pagination and roles information.
     *
     * @param int $perPage Number of trainings per page (default is 50)
     * @return LengthAwarePaginator
     */
    public function paginatedAll(int $perPage = 50): LengthAwarePaginator
    {
        return Training::with('exercises')->paginate($perPage);
    }

    /**
     * Find a training by its ID.
     *
     * @param int $id training's ID
     * @return Training|null
     */
    public function findById(int $id): ?Training
    {
        return Training::with('exercises')->where('id', $id)->first();
    }

    /**
     * Create a new training.
     *
     * @param array $data Data for the new training
     * @return Training|null
     */
    public function create(array $data): Training
    {
        return Training::create($data);
    }

    /**
     * Update an existing training with new data.
     *
     * @param Training $training The user to be updated
     * @param array $data The new data to update the training with
     * @return bool
     */
    public function update(Training $training, array $data): bool
    {
        return $training->update($data);
    }

    /**
     * Delete a training by id.
     *
     * @param Training $training The training to be deleted
     * @return bool
     */
    public function delete(Training $training): bool
    {
        return $training->delete();
    }
}
