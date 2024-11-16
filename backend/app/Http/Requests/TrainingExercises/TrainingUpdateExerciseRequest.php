<?php

namespace App\Http\Requests\TrainingExercises;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class TrainingUpdateExerciseRequest extends FormRequest
{
    public function authorize(): bool {
        return collect(['owner', 'admin', 'personal'])->contains(function ($role) {
            return auth()->user()->hasRole($role);
        });
    }

    public function rules(): array {
        return [
            'id' => 'prohibited',
            'series' => 'sometimes|required|integer|min:1',
            'repetitions' => 'sometimes|required|integer|min:1',
            'rest' => 'sometimes|required|integer|min:1',
            'comments' => 'nullable|string',
        ];
    }

    public function messages(): array {
        return [
            'series.integer' => 'O campo series deve ser um número inteiro.',
            'series.min' => 'O campo series deve ser pelo menos 1.',
            'repetitions.integer' => 'O campo repetitions deve ser um número inteiro.',
            'repetitions.min' => 'O campo repetitions deve ser pelo menos 1.',
            'rest.integer' => 'O campo rest deve ser um número inteiro.',
            'rest.min' => 'O campo rest deve ser pelo menos 1 segundo.',
            'comments.string' => 'O campo comments deve ser uma string.',
        ];
    }

    protected function withValidator(Validator $validator) {
        $validator->after(function ($validator) {
            $allowedFields = ['series', 'repetitions', 'rest', 'comments'];
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
