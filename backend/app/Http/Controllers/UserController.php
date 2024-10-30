<?php
namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\JsonResponse;
use App\Services\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }

    public function index(): JsonResponse {
        return $this->userService->getAllUsers();
    }

    public function show(int $id): JsonResponse {
        return $this->userService->getUserById($id);
    }

    public function store(UserStoreRequest $request): JsonResponse {
        return $this->userService->createUser($request->validated());
    }

    public function update(UserUpdateRequest $request, int $id): JsonResponse {
        return $this->userService->updateUser($request->validated(), $id);
    }

    public function destroy(int $id): JsonResponse {
        return $this->userService->deleteUser($id);
    }

    public function forgotPassword(ForgotPasswordRequest $request) :JsonResponse {
        
        $status = Password::broker('users')->sendResetLink(
            $request->only('email')
        );
    
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Um link para redefinir sua senha foi enviado para o seu e-mail.'], 200);
        } else {
            return response()->json(['message' => 'Endereço de e-mail inválido ou não foi possível enviar o link de redefinição de senha.'], 400);
        }
    }

    public function resetPassword(ResetPasswordRequest $request) :JsonResponse {

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => $password
                ])->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Sua senha foi redefinida!'], 200);
        } else {
            return response()->json(['message' => 'Não foi possivel redefinir sua senha no momento, por favor tente novamente mais tarde.'], 400);
        }
    }
}