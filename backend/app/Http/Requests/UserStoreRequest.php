<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    public function authorize() {
        return in_array(auth()->user()->role->name, ['receptionist', 'owner', 'admin', 'personal']);
    }

    public function rules() {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => 'required|string|unique:users|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'document' => 'required|string|unique:users|max:20',
            'password' => 'required|string|min:6|confirmed',
            'telephone' => 'nullable|string|max:15',
            'gender' => 'nullable|string|in:male,female,other',
            'profile_image' => 'nullable|string|max:255',
            'active' => 'boolean',
            'role_id' => 'required|exists:roles,id',
            'points' => 'integer',
        ];
    }

    public function messages() {
        return [
            'first_name.required' => 'O campo nome é obrigatório.',
            'last_name.required' => 'O campo sobrenome é obrigatório.',
            'username.required' => 'O campo nome de usuário é obrigatório.',
            'email.required' => 'O campo email é obrigatório.',
            'document.required' => 'O campo documento é obrigatório.',
            'password.required' => 'O campo senha é obrigatório.',
            'password.confirmed' => 'As senhas não coincidem.',
            'role_id.required' => 'O campo cargo é obrigatório.',
            'role_id.exists' => 'O cargo especificado não existe.',
        ];
    }
}