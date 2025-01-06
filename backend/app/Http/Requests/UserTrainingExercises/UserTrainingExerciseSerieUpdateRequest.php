<?php

namespace App\Http\Requests\UserTrainingExercises;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use App\Http\Requests\BaseRequest;

class UserTrainingExerciseSerieUpdateRequest extends BaseRequest
{
    protected array $allowedRoles = ['owner', 'admin', 'personal'];
    protected array $allowedFields = ['repetitions'];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'repetitions' => 'required|string'
        ];
    }

    /**
     * Get the validation messages.
     */
    protected array $customMessages = [
        'repetitions.required' => 'O campo repetições é obrigatório.',
        'repetitions.string' => 'O campo repetições deve ser uma string.',
    ];
}
