<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UserUpdateRequest extends FormRequest
{
    public function authorize() :bool {
        $userId = $this->route('user');

        return auth()->user()->id === (int) $userId || collect(['receptionist', 'owner', 'admin', 'personal'])->contains(function ($role) {
            return auth()->user()->hasRole($role);
        });
    }

    public function rules() :array {
        $userId = $this->route('user');

        return [
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'username' => "sometimes|required|string|unique:users,username,{$userId}|max:255",
            'email' => "sometimes|nullable|string|email|unique:users,email,{$userId}|max:255",
            'document' => "sometimes|required|string|unique:users,document,{$userId}|max:20",
            'password' => 'sometimes|nullable|string|min:8|confirmed',
            'telephone' => 'nullable|string|max:15',
            'gender' => 'nullable|string|in:male,female,other',
            'profile_image' => 'nullable|string|max:255',
            'active' => 'boolean',
            'points' => 'integer',
        ];
    }

    public function messages() :array {
        return [
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

    protected function withValidator(Validator $validator) {
        $validator->after(function ($validator) {
            $allowedFields = ['first_name', 'last_name', 'username', 'email', 'document', 'password', 'password_confirmation', 'telephone', 'gender', 'profile_image', 'active', 'points'];
            $extraFields = array_diff(array_keys($this->all()), $allowedFields);

            if (!empty($extraFields)) {
                $validator->errors()->add(
                    'fields',
                    'Os seguintes campos não são permitidos: ' . implode(', ', $extraFields)
                );
            }
        });
    }
}
