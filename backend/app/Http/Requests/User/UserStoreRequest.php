<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;

class UserStoreRequest extends BaseRequest
{
    protected array $allowedRoles = ['receptionist', 'owner', 'admin', 'personal'];

    protected array $allowedFields = [
        'first_name',
        'last_name',
        'username',
        'email',
        'document',
        'password',
        'password_confirmation',
        'telephone',
        'gender',
        'profile_image',
        'active',
        'points'
    ];

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => 'required|string|unique:users|max:255',
            'email' => 'sometimes|nullable|required|string|email|unique:users|max:255',
            'document' => 'required|string|unique:users|max:20',
            'password' => 'required|string|min:6|confirmed',
            'telephone' => 'nullable|string|unique:users|max:15',
            'gender' => 'nullable|string|in:male,female,other',
            'profile_image' => 'nullable|string|max:255',
            'active' => 'boolean',
            'points' => 'integer',
        ];
    }

    /**
     * Get the validation messages.
     */
    protected array $customMessages = [
        'first_name.required' => 'O campo nome é obrigatório.',
        'first_name.string' => 'O campo nome deve ser uma string.',
        'last_name.required' => 'O campo sobrenome é obrigatório.',
        'last_name.string' => 'O campo sobrenome deve ser uma string.',
        'document.required' => 'O campo documento é obrigatório.',
        'document.string' => 'O campo documento deve ser uma string.',
    ];
}
