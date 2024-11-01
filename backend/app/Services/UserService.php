<?php
namespace App\Services;

use App\Repositories\UserRepository;
use App\Exceptions\UserNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Password;
use App\Services\TwilioService;
use Illuminate\Support\Str;

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

    public function forgotPasswordStep1(string $document) {
        $user = $this->userRepository->findActiveUserByDocument($document);

        if (!$user) throw new UserNotFoundException();

        return response()->json(['userID' => $user->id, 'phone' => $user->telephone], 200);
    }

    public function forgotPasswordStep2(array $data) :JsonResponse {
        $user = $this->userRepository->findActiveUserById($data["id"]);

        if (!$user) throw new UserNotFoundException();

        $token = $user->createToken($user->document)->plainTextToken;
        $user->setRememberToken($token);

        $link = url('/password/reset/' . $user->id . '/' . $token);

        $twilio = new TwilioService();
        $twilio->sendSms($user->telephone, 'Link para redefinir sua senha: ' . $link);

        return response()->json(['message' => 'Um link foi enviado para redefinir sua senha foi enviado para seu telefone.'], 200);
    }

    public function resetPassword($request) :JsonResponse {
        $status = Password::broker('users')->reset(
            $request->only('id', 'password', 'password_confirmation', 'token'),
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