<?php

namespace App\Http\Requests\Training;

use App\Http\Requests\BaseRequest;

class TrainingStoreRequest extends BaseRequest
{
    protected array $allowedRoles = ['owner', 'admin', 'personal'];
    protected array $allowedFields = [
        'name',
        'description',
        'category'
    ];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string'
        ];
    }

    /**
     * Get the validation messages.
     */
    protected array $customMessages = [
        'name.required' => 'O campo nome é obrigatório.',
        'name.string' => 'O campo nome deve ser uma string.',
        'description.required' => 'O campo descrição é obrigatório.',
        'description.string' => 'O campo descrição deve ser uma string.',
        'category.required' => 'O campo categoria é obrigatório.',
        'category.string' => 'O campo categoria deve ser uma string.'
    ];
}
