<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;

class ResponseService
{
    public function success(string $message = '', $data = null, int $status = 200, string $wrapper = 'data'): JsonResponse {
        return response()->json(
            [
                'error' => false,
                'message' => $message,
                $wrapper => $data
            ], $status
        );
    }

    public function error(string $message, int $status): JsonResponse {
        return response()->json(
            [
                'error' => true,
                'message' => $message
            ], $status
        );
    }
}