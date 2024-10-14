<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

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

    public function update(UserUpdateRequest $request, int $id) :JsonResponse{
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
}