<?php

namespace App\Http\Requests\Auth;

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

    protected function withValidator($validator) {
        $validator->after(function ($validator) {
            $allowedFields = ['document', 'password'];
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