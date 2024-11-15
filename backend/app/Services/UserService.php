<?php
namespace App\Services;

use App\Repositories\UserRepository;
use App\Exceptions\NotFoundException;
use Illuminate\Http\JsonResponse;
use App\Services\TwilioService;
use App\Services\ResponseService;

class UserService
{
    protected $userRepository;
    protected $responseService;

    /**
     * Constructor to inject dependencies.
     *
     * @param UserRepository $userRepository
     * @param ResponseService $responseService
     */
    public function __construct(UserRepository $userRepository, ResponseService $responseService) {
        $this->userRepository = $userRepository;
        $this->responseService = $responseService;
    }

    /**
     * Retrieve all users with pagination.
     *
     * @return JsonResponse
     */
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

        return $this->responseService->success('Usuários encontrados', $customData);
    }

    /**
     * Retrieve a user by their ID.
     *
     * @param int $id
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function getUserById(int $id): JsonResponse {
        $user = $this->userRepository->findUserById($id);
        if (!$user) throw new NotFoundException('Usuário');
        
        return $this->responseService->success('Usuário encontrado', $user);
    }

    /**
     * Create a new user.
     *
     * @param array $data
     * @return JsonResponse
     */
    public function createUser(array $data): JsonResponse {
        $user = $this->userRepository->create($data);
        return $this->responseService->success('Usuário criado', $user, 201);
    }

    /**
     * Update an existing user.
     *
     * @param array $data
     * @param int $id
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function updateUser(array $data, int $id): JsonResponse {
        $user = $this->userRepository->findUserById($id);
        if (!$user) throw new NotFoundException('Usuário');
        
        $this->userRepository->update($user, $data);
        return $this->responseService->success('Usuário atualizado', $user);
    }

    /**
     * Soft delete a user by their ID.
     *
     * @param int $id
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function deleteUser(int $id): JsonResponse {
        $user = $this->userRepository->findUserById($id);
        if (!$user) throw new NotFoundException('Usuário');
        
        $this->userRepository->softDelete($user);
        return $this->responseService->success('Usuário removido');
    }

    /**
     * First step of the password recovery process.
     * Verifies the user by their document.
     *
     * @param string $document
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function forgotPasswordStep1(string $document) {
        $user = $this->userRepository->findActiveUserByDocument($document);
        if (!$user) throw new NotFoundException('Usuário');

        return $this->responseService->success('Usuário encontrado.', ['userID' => $user->id, 'telephone' => $user->telephone]);
    }

    /**
     * Second step of the password recovery process.
     * Sends a reset link to the user via SMS.
     *
     * @param array $data
     * @return JsonResponse
     * @throws NotFoundException
     */
    public function forgotPasswordStep2(array $data) :JsonResponse {
        $user = $this->userRepository->findActiveUserByDocument($data["document"]);
        if (!$user) throw new NotFoundException('Usuário');

        $token = $user->createToken($user->document)->plainTextToken;
        $safeToken = rtrim(strtr(base64_encode($token), '+/', '-_'), '=');

        $user->setRememberToken($safeToken);
        $user->save(); 

        $link = url('reset-password/' . $user->id . '/' . $safeToken);

        $twilio = new TwilioService();
        $twilio->sendSms("+55" . $user->telephone, "Link para redefinir sua senha: $link");

        return $this->responseService->success('Um link foi enviado ao seu telefone para redefinir sua senha.');
    }

    /**
     * Resets the user's password using the provided token.
     *
     * @param array $data
     * @return JsonResponse
     */
    public function resetPassword(array $data) :JsonResponse {
        $user = $this->userRepository->findUserById($data['id']);
        if (!$user) throw new NotFoundException('Usuário');

        if ($user->getRememberToken() != $data['token']) {
            return $this->responseService->error('Token inválido ou expirado.', 401);
        }

        $user->password = base64_decode($data['password']);
        $user->setRememberToken(null);
        $user->save();

        return $this->responseService->success('Senha redefinida');
    }
}
