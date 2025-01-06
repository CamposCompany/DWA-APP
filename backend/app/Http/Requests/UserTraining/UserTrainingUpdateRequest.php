<?php

namespace App\Http\Requests\UserTraining;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use App\Http\Requests\BaseRequest;

class UserTrainingUpdateRequest extends BaseRequest
{
    protected array $allowedRoles = ['owner', 'admin', 'personal'];
    protected array $allowedFields = [
        'user_id',
        'start_date',
        'expire_date',
        'active',
        'description',
        'objective',
        'position',
        'name'
    ];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        return [
            'user_id' => 'sometimes|required|integer',
            'start_date' => 'sometimes|required|date',
            'expire_date' => 'sometimes|required|date',
            'active' => 'boolean',
            'description' => 'string',
            'objective' => 'string|max:100',
            'position' => 'integer',
            'name' => 'string'
        ];
    }

    /**
     * Get the validation messages.
     */
    protected array $customMessages = [
        'user_id.integer' => 'O usuário deve ser um inteiro',
        'user_id.required' => 'O usuário é obrigatório',
        'start_date.required' => 'A data de início é obrigatória',
        'start_date.date' => 'A data de início deve ser uma data válida',
        'expire_date.required' => 'A data de expiração é obrigatória',
        'expire_date.date' => 'A data de expiração deve ser uma data válida',
        'active.boolean' => 'O campo ativo deve ser um booleano',
        'description.string' => 'A descrição deve ser uma string',
        'objective.string' => 'O objetivo deve ser uma string',
        'objective.max' => 'O objetivo deve ter no máximo 100 caracteres',
        'position.integer' => 'A posição deve ser um inteiro',
        'name.string' => 'O nome deve ser uma string'
    ];
}
