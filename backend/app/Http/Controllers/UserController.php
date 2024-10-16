<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Password;

class UserController extends Controller
{

    public function index() :JsonResponse {
        $users = User::where('deleted_at', null)->paginate(50);
        return response()->json($users);
    }

    public function show(int $id) :JsonResponse {
        $user = User::where(['id' => $id,'deleted_at' => null])->first();

        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado!'], 404);
        }

        return response()->json([
            'message' => 'Usuário encontrado com sucesso!',
            'data' => $user,
        ], 200);    
    }

    public function store(UserStoreRequest $request) {
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'email' => $request->email,
            'document' => $request->document,
            'password' => $request->password,
            'telephone' => $request->telephone,
            'gender' => $request->gender,
            'profile_image' => $request->profile_image,
            'active' => $request->active ?? true,
            'role_id' => $request->role_id,
            'points' => $request->points ?? 0
        ]);

        return response()->json([
            'message' => 'Usuário criado com sucesso!',
            'data' => $user,
        ], 201);
    }

    public function update(UserUpdateRequest $request, int $id) :JsonResponse {
        $user = User::where(['id' => $id,'deleted_at' => null])->first();
    
        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado!'], 404);
        }

        $user->update($request->only([
            'first_name',
            'last_name',
            'username',
            'email',
            'document',
            'telephone',
            'gender',
            'profile_image',
            'active',
            'role_id',
            'points',
        ]));
    
        if ($request->filled('password')) {
            $user->password = $request->password;
            $user->save();
        }
    
        return response()->json([
            'message' => 'Usuário atualizado com sucesso!',
            'data' => $user,
        ], 200);
    }

    public function destroy(int $id) :JsonResponse {
        $user = User::where(['id' => $id,'deleted_at' => null])->first();

        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado!'], 404);
        }

        $user->deleted_at = now();
        $user->save();

        return response()->json(['message' => 'Usuário removido com sucesso!'], 200);
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