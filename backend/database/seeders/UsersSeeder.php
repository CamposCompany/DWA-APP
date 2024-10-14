<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class UsersSeeder extends Seeder
{
    public function run() {
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'username' => 'admin_user',
            'email' => 'admin@admin.com',
            'document' => '12345678900',
            'password' => 'password',
            'telephone' => '123456789',
            'gender' => 'male',
            'profile_image' => null,
            'active' => true,
            'role_id' => Role::where('name', 'admin')->first()->id,
            'points' => 0,
        ]);

        User::create([
            'first_name' => 'Owner',
            'last_name' => 'User',
            'username' => 'owner_user',
            'email' => 'owner@owner.com',
            'document' => '12345678922',
            'password' => 'password',
            'telephone' => '456789123',
            'gender' => 'other',
            'profile_image' => null,
            'active' => true,
            'role_id' => Role::where('name', 'owner')->first()->id,
            'points' => 0,
        ]);

        User::create([
            'first_name' => 'Personal',
            'last_name' => 'User',
            'username' => 'personal_user',
            'email' => 'personal@personal.com',
            'document' => '12345678933',
            'password' => 'password',
            'telephone' => '987654321',
            'gender' => 'female',
            'profile_image' => null,
            'active' => true,
            'role_id' => Role::where('name', 'personal')->first()->id,
            'points' => 0,
        ]);

        User::create([
            'first_name' => 'Receptionist',
            'last_name' => 'User',
            'username' => 'receptionist_user',
            'email' => 'receptionist@receptionist.com',
            'document' => '12345678944',
            'password' => 'password',
            'telephone' => '456789123',
            'gender' => 'other',
            'profile_image' => null,
            'active' => true,
            'role_id' => Role::where('name', 'receptionist')->first()->id,
            'points' => 0,
        ]);

        // Create 10 people with "user" role
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'first_name' => 'User',
                'last_name' => 'User ' . $i,
                'username' => 'regular_user' . $i,
                'email' => 'user' . $i . '@user.com',
                'document' => '1234567890' . $i,
                'password' => 'password',
                'telephone' => null,
                'gender' => null,
                'profile_image' => null,
                'active' => true,
                'role_id' => Role::where('name', 'user')->first()->id,
                'points' => 0,
            ]);
        }
    }
}