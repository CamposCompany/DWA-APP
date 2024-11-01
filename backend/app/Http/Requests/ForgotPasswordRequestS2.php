<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ForgotPasswordRequestS2 extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'telephone' => 'required|string',
            'id' => 'required|integer',
        ];
    }

    public function messages() {
        return [
            'telephone.required' => 'O campo telefone é obrigatório.',
            'telephone.string' => 'O campo telefone deve ser uma string.',
            'id.required' => 'O campo id é obrigatório.',
        ];
    }
}
