<?php

namespace App\Http\Controllers;

//Facades
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
//Requests
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
//Models
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        $user = User::where('document', $request->document)->first();
    
        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken($request->document)->plainTextToken;    
            Auth::login($user);
    
            return response()->json([
                'message' => 'Usuário autenticado com sucesso',
                'data' => [
                    'user' => $user,
                    'token' => $token,
                ],
            ], 200);
        }
    
        return response()->json([
            'message' => 'Documento ou senha inválidos',
        ], 401);
    }

    public function logout(Request $request) :JsonResponse {
        $user = Auth::user();
        
        if ($user) {
            $user->tokens()->delete();
    
            return response()->json([
                'message' => 'Usuário desconectado com sucesso.',
            ], 200);
        }
    
        return response()->json([
            'message' => 'Não foi possível desconectar o usuário.',
        ], 400);
    }
}
