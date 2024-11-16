<?php
namespace App\Exceptions;

use App\Exceptions\CustomException;

class NotFoundException extends CustomException
{   
    protected $message;
    protected $code = 404;

    public function __construct(string $item = "Recurso") {
        $this->message = $item . ' não encontrado.';
        parent::__construct($this->message, $this->code);
    }
}