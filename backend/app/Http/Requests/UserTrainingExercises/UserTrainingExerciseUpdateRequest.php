<?php

namespace App\Http\Requests\UserTrainingExercises;

use App\Http\Requests\BaseRequest;

class UserTrainingExerciseUpdateRequest extends BaseRequest
{
    protected array $allowedRoles = ['owner', 'admin', 'personal'];
    protected array $allowedFields = [
        'exercise_id',
        'series',
        'repetitions',
        'rest',
        'comments',
        'weight'
    ];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'exercise_id' => 'string',
            'series' => 'string',
            'repetitions' => 'string',
            'rest' => 'string',
            'comments' => 'string|max:255',
            'weight' => 'string'
        ];
    }

    /**
     * Get the validation messages.
     */
    protected array $customMessages = [
        'exercise_id.string' => 'O campo id do exercicio deve ser uma string.',
        'repetitions.string' => 'O campo repetições deve ser uma string.',
        'series.string' => 'O campo séries deve ser uma string.',
        'rest.string' => 'O campo descanso deve ser uma string.',
        'comments.string' => 'O campo comentários deve ser uma string.',
        'comments.max' => 'O campo comentários deve ter no máximo 255 caracteres.',
        'weight.string' => 'O campo peso deve ser uma string.'
    ];
}
