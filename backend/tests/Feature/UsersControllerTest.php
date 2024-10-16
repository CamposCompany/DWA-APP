<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Faker\Factory as Faker;


class UsersControllerTest extends TestCase
{
    // use RefreshDatabase;

    protected function setUp(): void {
        parent::setUp();

        // Role::create(['name' => 'admin']);
        // Role::create(['name' => 'user']);
    }

    /** @test */
    public function it_allows_admin_to_create_user()
    {
        $faker = Faker::create();
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::where('name', 'admin')->first()->id);

        $this->actingAs($admin);

        $response = $this->post('api/users', [
            "first_name" => $faker->firstName(),
            "last_name" => $faker->lastName(),
            "username" => $faker->userName(),
            "email" => $faker->unique()->safeEmail(),
            "document" => $faker->numerify('###########'),
            "password" => 'password123',
            "password_confirmation" => 'password123',
            "telephone" => $faker->phoneNumber(),
            "gender" => $faker->randomElement(['male', 'female']),
            "profile_image" => 'profile.jpg',
            "active" => $faker->boolean(),
            "role_id" => $faker->numberBetween(1, 5),
            "points" => $faker->numberBetween(0, 500),
        ]);

        $response->assertStatus(201);
        // $this->assertDatabaseHas('users', ['email' => $response->json('email')]);
    }


    /** @test */
    public function it_prevents_user_without_permission_from_creating_user() {
        $faker = Faker::create();

        $user = User::factory()->create();
        $user->roles()->attach(Role::where('name', 'user')->first()->id);

        $this->actingAs($user);

        $response = $this->post('api/users', [
            "first_name" => $faker->firstName(),
            "last_name" => $faker->lastName(),
            "username" => $faker->userName(),
            "email" => $faker->unique()->safeEmail(),
            "document" => $faker->numerify('###########'),
            "password" => 'password123',
            "password_confirmation" => 'password123',
            "telephone" => $faker->phoneNumber(),
            "gender" => $faker->randomElement(['male', 'female']),
            "profile_image" => 'profile.jpg',
            "active" => $faker->boolean(),
            "role_id" => $faker->numberBetween(1, 5),
            "points" => $faker->numberBetween(0, 500),
        ]);

        $response->assertStatus(403);
    }
}