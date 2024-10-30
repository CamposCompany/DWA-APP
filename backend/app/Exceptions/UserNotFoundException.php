<?php
namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class UserNotFoundException extends Exception
{    
    public function render(): JsonResponse {
        return response()->json([
            'message' => 'Usuário não encontrado.'
        ], 404);
    }
}