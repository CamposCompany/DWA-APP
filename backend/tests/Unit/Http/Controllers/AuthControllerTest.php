<?php

namespace Tests\Unit\Http\Controllers;

use Tests\TestCase;
use Mockery;
use App\Http\Controllers\AuthController;
use App\Services\AuthService;
use App\Services\ExceptionHandlerService;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Mockery\MockInterface;
use Exception;

class AuthControllerTest extends TestCase
{
    /**
     * @var MockInterface&AuthService
     */
    private $authService;

    /**
     * @var MockInterface&ExceptionHandlerService
     */
    private $exceptionHandlerService;

    private AuthController $authController;

    protected function setUp(): void
    {
        parent::setUp();

        // Create mocks with type-specific mock interfaces
        $this->authService = Mockery::mock(AuthService::class);
        $this->exceptionHandlerService = Mockery::mock(ExceptionHandlerService::class);

        // Create the controller with mocked dependencies
        $this->authController = new AuthController(
            $this->authService,
            $this->exceptionHandlerService
        );
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function testLoginSuccess(): void
    {
        $loginData = [
            'document' => '12345678900',
            'password' => 'cGFzc3dvcmQ='
        ];

        $expectedResponse = new JsonResponse([
            "error" => false,
            "message" => "Usuário autenticado com sucesso.",
            "data" => [
                "user" => [
                    "first_name" => "Admin",
                    "last_name" => "User",
                    "username" => "admin_user",
                    "email" => "admin@admin.com",
                    "document" => "12345678900",
                    "telephone" => "123456789",
                    "gender" => "male",
                    "profile_image" => null,
                    "active" => true,
                    "points" => 0,
                    "deleted_at" => null,
                    "last_login" => null,
                    "id" => 1,
                    "roles" => [
                        [
                            "name" => "admin",
                            "pivot" => [
                                "user_id" => 1,
                                "role_id" => 1
                            ]
                        ]
                    ]
                ],
                "token" => "1|XkFAZGM52e92umYQ5upcvbrdqsdid1wYlkgyGbA2e4226675"
            ],
        ]);
        
        /** @var MockInterface&LoginRequest $loginRequest */
        $loginRequest = Mockery::mock(LoginRequest::class);
        $loginRequest->shouldReceive('validated')
            ->once()
            ->andReturn($loginData);

        $this->authService->shouldReceive('login')
            ->once()
            ->with($loginData)
            ->andReturn($expectedResponse);

        $this->exceptionHandlerService->shouldReceive('handle')
            ->once()
            ->andReturnUsing(fn($callback) => $callback());

        $response = $this->authController->login($loginRequest);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals($expectedResponse, $response);
    }

    public function testLoginFailure(): void
    {
        $loginData = [
            'document' => '12345678900',
            'password' => 'wrongpassword'
        ];

        /** @var MockInterface&LoginRequest $loginRequest */
        $loginRequest = Mockery::mock(LoginRequest::class);
        $loginRequest->shouldReceive('validated')
            ->once()
            ->andReturn($loginData);

        $this->authService->shouldReceive('login')
            ->once()
            ->with($loginData)
            ->andThrow(new Exception('Invalid credentials'));

        $this->exceptionHandlerService->shouldReceive('handle')
            ->once()
            ->andReturnUsing(fn($callback) => $callback());

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Invalid credentials');

        $this->authController->login($loginRequest);
    }

    public function testLogoutSuccess(): void
    {
        $expectedResponse = new JsonResponse(['message' => 'Successfully logged out']);

        $this->authService->shouldReceive('logout')
            ->once()
            ->andReturn($expectedResponse);

        $this->exceptionHandlerService->shouldReceive('handle')
            ->once()
            ->andReturnUsing(fn($callback) => $callback());

        $response = $this->authController->logout();

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals($expectedResponse, $response);
    }
    
    public function testLogoutFailure(): void
    {
        // Prepare
        $this->authService->shouldReceive('logout')
            ->once()
            ->andThrow(new Exception('Logout failed'));

        $this->exceptionHandlerService->shouldReceive('handle')
            ->once()
            ->andReturnUsing(function ($callback) {
                try {
                    $callback();
                } catch (Exception $e) {
                    throw $e;
                }
            });

        // Act & Assert
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Logout failed');

        $this->authController->logout();
    }

}
