<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use App\Http\Requests\BaseRequest;

class ForgotPasswordRequestS1 extends BaseRequest
{
    protected array $allowedRoles = [];

    protected array $allowedFields = [
        'document'
    ];

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'document' => 'required|string',
        ];
    }

    /**
     * Get the validation messages.
     */
    protected array $customMessages = [
        'document.required' => 'O campo documento é obrigatório.',
        'document.string' => 'O campo documento deve ser uma string.',
    ];
}
