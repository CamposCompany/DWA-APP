<?php
namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class DocumentOrPasswordInvalidsException extends Exception
{ 
    public function render(): JsonResponse {
        return response()->json([
            'message' => 'Documento ou senha inválidos.'
        ], 401);
    }
}