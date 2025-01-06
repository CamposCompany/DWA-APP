<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;

class ResetPasswordRequest extends BaseRequest
{
    protected array $allowedRoles = [];

    protected array $allowedFields = [
        'id',
        'token',
        'password',
        'password_confirmation'
    ];

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'id' => 'required|string',
            'token' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ];
    }

    /**
     * Get the validation messages.
     */
    protected array $customMessages = [
        'id.required' => 'O campo documento é obrigatório.',
        'token.required' => 'O campo token é obrigatório.',
        'password.required' => 'O campo senha é obrigatório.',
        'password.confirmed' => 'As senhas não coincidem.',
    ];
}
