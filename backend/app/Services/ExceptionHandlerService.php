<?php
namespace App\Services;

use App\Exceptions\CustomException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Exception;
use TypeError;
use Error;

class ExceptionHandlerService
{
    protected $responseService;

    public function __construct(ResponseService $responseService) {
        $this->responseService = $responseService;
    }

    public function handle(callable $callback): JsonResponse {
        try {
            return $callback();
        } catch (CustomException $e) {
            return $e->render();
        } catch (TypeError $e) {
            Log::error($e->getMessage());
            return $this->responseService->error('Tipo de dado inválido.', 400);
        } catch (Error $e) {
            Log::error($e->getMessage());
            return $this->responseService->error('Erro inesperado.', 500);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return $this->responseService->error('Erro interno.', 500);
        }
    }
}