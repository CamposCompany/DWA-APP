<?php

namespace App\Http\Requests\Exercise;

use App\Http\Requests\BaseRequest;

class ExerciseUpdateRequest extends BaseRequest
{
    protected array $allowedRoles = ['owner', 'admin', 'personal'];

    protected array $allowedFields = [
        'name',
        'description',
        'equipment',
        'category',
        'image',
        'video',
        'video_url'
    ];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'equipment' => 'sometimes|required|string',
            'category' => 'sometimes|required|string',
            'image' => 'string',
            'video' => 'string',
        ];
    }

    /**
     * Get the validation messages.
     */
    protected array $customMessages = [
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
