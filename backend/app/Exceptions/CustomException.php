<?php
namespace App\Exceptions;

use Exception;
use App\Services\ResponseService;

class CustomException extends Exception
{
    protected $responseService;

    public function __construct(string $message = null, int $code = 0) {
        $message = $message ?? $this->message ?? 'Ocorreu um erro.';
        $code = $code ?: ($this->code ?? 500);

        parent::__construct($message, $code);

        $this->responseService = app(ResponseService::class);
    }

    public function render() {
        return $this->responseService->error($this->getMessage(), $this->getCode());
    }
}