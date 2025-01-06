<?php

namespace App\Http\Requests\TrainingExercises;

use App\Http\Requests\BaseRequest;

class TrainingUpdateExerciseRequest extends BaseRequest
{
    protected array $allowedRoles = ['owner', 'admin', 'personal'];
    protected array $allowedFields = [
        'series',
        'repetitions',
        'rest',
        'comments'
    ];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array {
        return [
            'id' => 'prohibited',
            'series' => 'sometimes|required|integer|min:1',
            'repetitions' => 'sometimes|required|integer|min:1',
            'rest' => 'sometimes|required|integer|min:1',
            'comments' => 'nullable|string',
        ];
    }

    /**
     * Get the validation messages.
     */
    protected array $customMessages = [
        'series.integer' => 'O campo series deve ser um número inteiro.',
        'series.min' => 'O campo series deve ser pelo menos 1.',
        'repetitions.integer' => 'O campo repetitions deve ser um número inteiro.',
        'repetitions.min' => 'O campo repetitions deve ser pelo menos 1.',
        'rest.integer' => 'O campo rest deve ser um número inteiro.',
        'rest.min' => 'O campo rest deve ser pelo menos 1 segundo.',
        'comments.string' => 'O campo comments deve ser uma string.',
    ];
}
