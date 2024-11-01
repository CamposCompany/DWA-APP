<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(ResetPasswordRequest $request): bool
    {
        return User::where('email', $request->email)->first();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'required|integer',
            'token' => 'required',
            'password' => 'required|string|min:6|confirmed',
        ];
    }

    public function messages() {
        return [
            'token.required' => 'O campo token é obrigatório.',
            'id.required' => 'O campo documento é obrigatório.',
            'password.required' => 'O campo senha é obrigatório.',
            'password.confirmed' => 'As senhas não coincidem.'
        ];
    }
}
