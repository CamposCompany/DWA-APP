<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'document' => 'required|string',
            'password' => 'required|string',
        ];
    }

    public function messages() {
        return [
            'document.required' => 'O campo documento é obrigatório.',
            'document.string' => 'O campo documento deve ser uma string.',
            'password.required' => 'O campo senha é obrigatório.',
            'password.string' => 'O campo senha deve ser uma string.',
        ];
    }
}