<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;

class UserUpdateRequest extends BaseRequest
{
    protected array $allowedRoles = ['receptionist', 'owner', 'admin', 'personal'];
    protected array $allowedFields = [
        'first_name', 'last_name', 'username', 'email', 'document',
        'password', 'password_confirmation', 'telephone', 'gender',
        'profile_image', 'active', 'points'
    ];

    public function authorize() :bool {
        $userId = $this->route('user');

        // Check if user is updating their own profile
        if (auth()->user()->id === (int) $userId) {
            return true;
        }

        return parent::authorize();
    }

    public function rules() :array {
        $userId = $this->route('user');

        return [
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'username' => "sometimes|required|string|max:255",
            'email' => "sometimes|nullable|string|email|unique:users,email,{$userId}|max:255",
            'document' => "sometimes|required|string|unique:users,document,{$userId}|max:20",
            'password' => 'sometimes|nullable|string|min:8|confirmed',
            'telephone' => 'nullable|string|unique:users,telephone,{$userId}|max:15',
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
        'last_name.required' => 'O campo sobrenome é obrigatório.',
        'username.required' => 'O campo nome de usuário é obrigatório.',
        'email.required' => 'O campo email é obrigatório.',
        'document.required' => 'O campo documento é obrigatório.',
        'password.required' => 'O campo senha é obrigatório.',
        'password.confirmed' => 'As senhas não coincidem.',
        'first_name.string' => 'O campo nome deve ser uma string.',
        'last_name.string' => 'O campo sobrenome deve ser uma string.',
        'username.string' => 'O campo nome de usuário deve ser uma string.',
        'email.string' => 'O campo email deve ser uma string.',
        'document.string' => 'O campo documento deve ser uma string.',
        'password.string' => 'O campo senha deve ser uma string.',
        'telephone.string' => 'O campo telefone deve ser uma string.',
        'profile_image.string' => 'O campo imagem de perfil deve ser uma string.',
        'active.boolean' => 'O campo ativo deve ser um booleano.',
        'points.integer' => 'O campo pontos deve ser um inteiro.',
    ];
}
