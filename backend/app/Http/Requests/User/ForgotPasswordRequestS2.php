<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;

class ForgotPasswordRequestS2 extends BaseRequest
{
    protected array $allowedRoles = [];

    protected array $allowedFields = [
        'telephone',
        'document'
    ];


    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'telephone' => 'required|string',
            'document' => 'required|string',
        ];
    }

    /**
     * Get the validation messages.
     */
    protected array $customMessages = [
        'telephone.required' => 'O campo telefone é obrigatório.',
        'telephone.string' => 'O campo telefone deve ser uma string.',
        'document.required' => 'O campo documento é obrigatório.',
        'document.string' => 'O campo documento deve ser uma string.',
    ];
}
