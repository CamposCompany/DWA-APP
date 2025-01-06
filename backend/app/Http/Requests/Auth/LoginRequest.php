<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;

class LoginRequest extends BaseRequest
{
    protected array $allowedFields = ['document', 'password'];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'document' => 'required|string',
            'password' => 'required|string',
        ];
    }

    /**
     * Get the validation messages.
     */
    protected array $customMessages = [
        'document.required' => 'O campo documento é obrigatório.',
        'document.string' => 'O campo documento deve ser uma string.',
        'password.required' => 'O campo senha é obrigatório.',
        'password.string' => 'O campo senha deve ser uma string.',
    ];
}
