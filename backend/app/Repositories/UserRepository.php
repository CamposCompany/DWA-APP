<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    /**
     * Retrieve all users with pagination and roles information.
     *
     * @param int $perPage Number of users per page (default is 50)
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function paginatedAllUsers(int $perPage = 50) {
        return User::with(['roles' => function ($query) {
            $query->select('name');
        }])->paginate($perPage);
    }

    /**
     * Find a user by its ID, including the roles.
     *
     * @param int $id User's ID
     * @return User|null
     */
    public function findUserById(int $id): ?User {
        return User::with(['roles' => function ($query) {
            $query->select('name');
        }])->where('id', $id)->first();
    }

    /**
     * Find an active user by ID, including roles. Active users are those that are not soft deleted.
     *
     * @param int $id User's ID
     * @return User|null
     */
    public function findActiveUserById(int $id): ?User {
        return User::with(['roles' => function ($query) {
            $query->select('name');
        }])->where('id', $id)->whereNull('deleted_at')->first();
    }

    /**
     * Find an active user by their document number.
     *
     * @param string $document User's document number (e.g. CPF or ID)
     * @return User|null
     */
    public function findActiveUserByDocument(string $document): ?User {
        return User::with(['roles' => function ($query) {
            $query->select('name');
        }])->where('document', $document)->whereNull('deleted_at')->first();
    }

    /**
     * Retrieve all active users with pagination and roles information.
     *
     * @param int $perPage Number of users per page (default is 50)
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function paginateAllActiveUsers(int $perPage = 50) {
        return User::with(['roles' => function ($query) {
            $query->select('name');
        }])->whereNull('deleted_at')->paginate($perPage);
    }

    /**
     * Create a new user.
     *
     * @param array $data Data for the new user
     * @return User
     */
    public function create(array $data): User {
        return User::create($data);
    }

    /**
     * Update an existing user with new data.
     *
     * @param User $user The user to be updated
     * @param array $data The new data to update the user with
     * @return bool
     */
    public function update(User $user, array $data): bool {
        return $user->update($data);
    }

    /**
     * Soft delete a user by setting the 'deleted_at' field.
     *
     * @param User $user The user to be soft deleted
     * @return bool
     */
    public function softDelete(User $user): bool {
        return $user->update(['deleted_at' => now()]);
    }
}