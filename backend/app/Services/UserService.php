<?php
namespace App\Services;

use App\Repositories\UserRepository;
use App\Exceptions\UserNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Password;

class UserService
{
    protected $userRepository;
    protected $responseService;

    public function __construct(UserRepository $userRepository, ResponseService $responseService) {
        $this->userRepository = $userRepository;
        $this->responseService = $responseService;
    }

    public function getAllUsers(): JsonResponse {
        $users = $this->userRepository->paginatedAllUsers();
        
        $customData = [
            'current_page' => $users->currentPage(),
            'users' => $users->items(),
            'total' => $users->total(),
            'per_page' => $users->perPage(),
            'last_page' => $users->lastPage(),
            'next_page_url' => $users->nextPageUrl(),
            'prev_page_url' => $users->previousPageUrl()
        ];

        return $this->responseService->success('Usuários encontrados com sucesso.', $customData);
    }

    public function getUserById(int $id): JsonResponse {
        $user = $this->userRepository->findActiveUserById($id);
        
        if (!$user) throw new UserNotFoundException();
        
        return $this->responseService->success('Usuário encontrado com sucesso.', $user);
    }

    public function createUser(array $data): JsonResponse {
        $user = $this->userRepository->create($data);
        return $this->responseService->success('Usuário criado com sucesso.', $user, 201);
    }

    public function updateUser(array $data, int $id): JsonResponse {
        $user = $this->userRepository->findActiveUserById($id);
        
        if (!$user) throw new UserNotFoundException();
        
        $this->userRepository->update($user, $data);
        return $this->responseService->success('Usuário atualizado com sucesso.', $user);
    }

    public function deleteUser(int $id): JsonResponse {
        $user = $this->userRepository->findActiveUserById($id);

        if (!$user) throw new UserNotFoundException();
        
        $this->userRepository->softDelete($user);
        return $this->responseService->success('Usuário removido com sucesso.');
    }

    public function forgotPassword($request) :JsonResponse {
        $status = Password::broker('users')->sendResetLink(
            $request->only('email')
        );
    
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Um link para redefinir sua senha foi enviado para o seu e-mail.'], 200);
        } else {
            return response()->json(['message' => 'Endereço de e-mail inválido ou não foi possível enviar o link de redefinição de senha.'], 400);
        }
    }

    public function resetPassword($request) :JsonResponse {
        $status = Password::broker('users')->reset(
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