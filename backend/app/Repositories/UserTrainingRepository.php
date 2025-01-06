<?php

namespace App\Repositories;

use App\Models\UserTraining;

class UserTrainingRepository
{
    /**
     * Find a user training by ID.
     *
     * @param int $id
     * @return UserTraining|null
     */
    public function findById(int $id): ?UserTraining {
        return UserTraining::with([
            'exercises',
            'exercises.repetitions'
        ])->find($id);
    }

    /**
     * Create a new user.
     *
     * @param array $data
     * @return UserTraining|null
     */
    public function create(array $data): UserTraining {
        return UserTraining::create($data);
    }

    /**
     * Update an existing user with new data.
     *
     * @param UserTraining $userTraining
     * @param array $data
     * @return bool
     */
    public function update(UserTraining $userTraining, array $data): bool {
        return $userTraining->update($data);
    }

    /**
     * Delete a user by ID.
     *
     * @param UserTraining $userTraining
     * @return bool
     */
    public function delete(UserTraining $userTraining): bool {
        return $userTraining->delete();
    }
}
