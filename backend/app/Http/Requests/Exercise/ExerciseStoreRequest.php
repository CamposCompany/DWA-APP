<?php

namespace App\Http\Requests\Exercise;

use App\Http\Requests\BaseRequest;
class ExerciseStoreRequest extends BaseRequest
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
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'equipment' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|file|mimes:jpeg,png,jpg|max:5120',
            'video' => 'nullable',
            'video.*' => 'mimes:mp4,mov,avi,wmv|max:102400|file',
            'video_url' => 'nullable|string|url',
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
        'video.*.mimes' => 'O arquivo de vídeo deve ser do tipo: mp4, mov, avi ou wmv.',
        'video.*.max' => 'O arquivo de vídeo não pode ser maior que 100MB.',
        'video_url.url' => 'O link do vídeo deve ser uma URL válida.',
    ];
}
