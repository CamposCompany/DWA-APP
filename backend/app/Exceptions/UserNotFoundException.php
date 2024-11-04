<?php
namespace App\Exceptions;

use App\Exceptions\CustomException;

class UserNotFoundException extends CustomException
{    
    protected $message = 'Usuário não encontrado.';
    protected $code = 404;
}