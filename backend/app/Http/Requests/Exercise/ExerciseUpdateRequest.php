<?php

namespace App\Http\Requests\Exercise;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class ExerciseUpdateRequest extends FormRequest
{
    public function authorize() :bool {
        return collect(['owner', 'admin', 'personal'])->contains(function ($role) {
            return auth()->user()->hasRole($role);
        });
    }

    public function rules() {
        return [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'equipment' => 'sometimes|required|string',
            'category' => 'sometimes|required|string',
            'image' => 'string',
            'video' => 'string',
        ];
    }

    public function messages() {
        return [
            'name.required' => 'O campo nome é obrigatório.',
            'description.required' => 'O campo descrição é obrigatório.',
            'equipment.required' => 'O campo equipamento é obrigatório.',
            'category.required' => 'O campo categoria é obrigatório.',
            'name.string' => 'O campo nome deve ser uma string.',
            'description.string' => 'O campo descrição deve ser uma string.',
            'equipment.string' => 'O campo equipamento deve ser uma string.',
            'category.string' => 'O campo categoria deve ser uma string.',
            'image.string' => 'O campo imagem deve ser uma string.',
            'video.string' => 'O campo vídeo deve ser uma string.',
        ];
    }

    protected function withValidator(Validator $validator) {
        $validator->after(function ($validator) {
            $allowedFields = ['name', 'description', 'equipment', 'category', 'image', 'video'];
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