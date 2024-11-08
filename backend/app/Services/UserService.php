<?php
namespace App\Services;

use App\Repositories\UserRepository;
use App\Exceptions\UserNotFoundException;
use Illuminate\Http\JsonResponse;
use App\Services\TwilioService;
use App\Services\ResponseService;

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

        return $this->responseService->success('Usuário encontrado.', ['userID' => $user->id, 'telephone' => $user->telephone]);
    }

    public function forgotPasswordStep2(array $data) :JsonResponse {
        $user = $this->userRepository->findActiveUserByDocument($data["document"]);

        if (!$user) throw new UserNotFoundException();

        $token = $user->createToken($user->document)->plainTextToken;
        $user->setRememberToken($token);
        $user->save();

        $link = url('reset-password' . $user->document . '/' . $token);

        $twilio = new TwilioService();
        $twilio->sendSms("+55" . $user->telephone, 'Link para redefinir sua senha: ' . $link);

        return $this->responseService->success('Um link foi enviado ao seu telefone para redefinir sua senha.');
    }

    public function resetPassword(array $data) :JsonResponse {
        $user = $this->userRepository->findActiveUserByDocument($data['document']);

        if (!$user || $user->getRememberToken() != $data['token']) {
            return $this->responseService->error('Token inválido ou expirado.', 401);
        }

        $user->password = bcrypt($data['password']);
        $user->setRememberToken(null);
        $user->save();

        return $this->responseService->success('Senha redefinida com sucesso.');
    }
}