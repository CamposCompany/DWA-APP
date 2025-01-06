<?php

namespace App\Http\Requests\Training;

use App\Http\Requests\BaseRequest;

class TrainingUpdateRequest extends BaseRequest
{
    protected array $allowedRoles = ['owner', 'admin', 'personal'];

    protected array $allowedFields = [
        'name',
        'description',
        'category',
        'duration'
    ];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array    
     */
    public function rules(): array {
        return [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'category' => 'sometimes|required|string',
            'duration' => 'sometimes|required|integer',
        ];
    }

    /**
     * Get the validation messages.
     */
    protected array $customMessages = [
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
