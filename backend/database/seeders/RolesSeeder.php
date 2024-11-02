<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    public function run(): void {
        $roles = ['admin', 'owner', 'personal', 'receptionist', 'user'];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }
    }
}
