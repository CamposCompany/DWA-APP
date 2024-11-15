<?php

namespace App\Http\Requests\Training;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class TrainingStoreRequest extends FormRequest
{
    public function authorize() :bool {
        return collect(['owner', 'admin', 'personal'])->contains(function ($role) {
            return auth()->user()->hasRole($role);
        });
    }

    public function rules() {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'duration' => 'required|integer',
        ];
    }

    public function messages() {
        return [
            'name.required' => 'O campo nome é obrigatório.',
            'description.required' => 'O campo descrição é obrigatório.',
            'category.required' => 'O campo categoria é obrigatório.',
            'duration.required' => 'O campo duração é obrigatório.',
            'name.string' => 'O campo nome deve ser uma string.',
            'description.string' => 'O campo descrição deve ser uma string.',
            'category.string' => 'O campo categoria deve ser uma string.',
            'duration.integer' => 'O campo duração deve ser um número inteiro.',
        ];
    }

    protected function withValidator(Validator $validator) {
        $validator->after(function ($validator) {
            $allowedFields = ['name', 'description', 'category', 'duration'];
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