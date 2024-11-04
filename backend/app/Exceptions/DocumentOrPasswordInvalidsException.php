<?php
namespace App\Exceptions;

class DocumentOrPasswordInvalidsException extends CustomException
{ 
    protected $message = 'Documento ou senha inválidos.';
    protected $code = 401;
}