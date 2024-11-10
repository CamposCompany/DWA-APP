<?php
namespace App\Services;

use App\Repositories\UserRepository;
use App\Exceptions\UserNotFoundException;
use App\Exceptions\DocumentOrPasswordInvalidsException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    protected $userRepository;
    protected $responseService;

    public function __construct(UserRepository $userRepository, ResponseService $responseService) {
        $this->userRepository = $userRepository;
        $this->responseService = $responseService;
    }

    public function login(array $data) {
        $user = $this->userRepository->findActiveUserByDocument($data['document']);
        
        if (!$user) throw new UserNotFoundException();
        $decryptedPassword = $this->decryptPassword($data['password']);

        if (Hash::check($decryptedPassword, $user->password)) {
            $token = $user->createToken($data['document'])->plainTextToken;
            Auth::login($user);

            $userBase = $user->replicate();
            $userBase->id = $user->id;
            
            $user->last_login = now();
            $user->save();
            
            return $this->responseService->success('Usuário autenticado com sucesso.', [
                'user' =>  $userBase,
                'token' => $token,
            ]);
        }

        throw new DocumentOrPasswordInvalidsException();
    }

    public function logout() {
        $user = Auth::user();

        if (!$user) throw new UserNotFoundException();

        if ($user) {
            $user->tokens()->delete();
    
            return $this->responseService->success('Usuário desconectado com sucesso.');
        }
    
        return $this->responseService->error('Não foi possível desconectar o usuário.', 400);
    }

    private function decryptPassword($password) {
        return base64_decode($password);
    }
   
}