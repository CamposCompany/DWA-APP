<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;
use Faker\Factory as Faker;

class UsersControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $faker;
    protected $adminRole;
    protected $userRole;

    protected function setUp(): void 
    {
        parent::setUp();

        // Initialize Faker
        $this->faker = Faker::create();

        // Create roles with a more robust approach
        $this->adminRole = Role::firstOrCreate(['name' => 'admin']);
        $this->userRole = Role::firstOrCreate(['name' => 'user']);
    }

    #[Test]
    public function allows_admin_to_create_user_with_valid_data()
    {
        // Prepare an admin user
        $admin = $this->createAdminUser();

        // Prepare user data
        $userData = $this->generateUserData();

        // Act as admin and send request
        $response = $this->actingAs($admin)
            ->postJson('api/users', $userData);

        // Assertions
        $response->assertStatus(201);
        $this->assertDatabaseHas('users', [
            'email' => $userData['email'],
            'first_name' => $userData['first_name'],
            'last_name' => $userData['last_name'],
            'username' => $userData['username'],
        ]);

        // Verify user creation details
        $createdUser = User::where('email', $userData['email'])->first();
        $this->assertNotNull($createdUser);
        $this->assertTrue(Hash::check($userData['password'], $createdUser->password));
    }

    #[Test]
    public function prevents_user_without_admin_permission_from_creating_user() 
    {
        // Prepare a regular user
        $regularUser = $this->createRegularUser();

        // Prepare user data
        $userData = $this->generateUserData();

        // Act as regular user and send request
        $response = $this->actingAs($regularUser)
            ->postJson('api/users', $userData);

        // Assertions
        $response->assertStatus(403);
        $this->assertDatabaseMissing('users', ['email' => $userData['email']]);
    }

    #[Test]
    public function validates_user_creation_data()
    {
        // Prepare an admin user
        $admin = $this->createAdminUser();

        // Prepare invalid user data
        $invalidUserData = [
            'email' => 'invalid-email',
            'password' => 'short',
            'first_name' => '',
        ];

        // Act as admin and send request with invalid data
        $response = $this->actingAs($admin)
            ->postJson('api/users', $invalidUserData);

        // Assertions
        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'email',
            'password',
            'first_name',
        ]);
    }

    #[Test]
    public function prevents_creating_user_with_duplicate_email()
    {
        // Prepare an admin user
        $admin = $this->createAdminUser();

        // Create a user with an existing email
        $existingUser = User::factory()->create();

        // Prepare user data with existing email
        $userData = $this->generateUserData([
            'email' => $existingUser->email
        ]);

        // Act as admin and send request
        $response = $this->actingAs($admin)
            ->postJson('api/users', $userData);

        // Assertions
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    /**
     * Helper method to create an admin user
     * 
     * @return User
     */
    private function createAdminUser(): User
    {
        $admin = User::factory()->create();
        $admin->roles()->attach($this->adminRole->id);
        return $admin;
    }

    /**
     * Helper method to create a regular user
     * 
     * @return User
     */
    private function createRegularUser(): User
    {
        $user = User::factory()->create();
        $user->roles()->attach($this->userRole->id);
        return $user;
    }

    /**
     * Generate user data with optional overrides
     * 
     * @param array $overrides
     * @return array
     */
    private function generateUserData(array $overrides = []): array
    {
        return array_merge([
            "first_name" => $this->faker->firstName(),
            "last_name" => $this->faker->lastName(),
            "username" => $this->faker->unique()->userName(),
            "email" => $this->faker->unique()->safeEmail(),
            "document" => $this->faker->numerify('###########'),
            "password" => 'password123',
            "password_confirmation" => 'password123',
            "telephone" => substr($this->faker->phoneNumber(), 0, 15),
            "gender" => $this->faker->randomElement(['male', 'female']),
            "profile_image" => 'profile.jpg',
            "active" => $this->faker->boolean(),
            "points" => $this->faker->numberBetween(0, 500),
        ], $overrides);
    }
}