<?php

namespace App\Http\Requests\UserTraining;

use App\Http\Requests\BaseRequest;


class UserTrainingStoreRequest extends BaseRequest
{
    protected array $allowedRoles = ['owner', 'admin', 'personal'];
    protected array $allowedFields = [
        'user_id',
        'training_id',
        'start_date',
        'expire_date'
    ];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'required|exists:users,id',
            'training_id' => 'required|exists:trainings,id',
            'start_date' => 'required|date',
            'expire_date' => 'required|date'
        ];
    }

    /**
     * Get the validation messages.
     */
    protected array $customMessages = [
        'user_id.required' => 'O campo userID é obrigatório.',
        'training_id.required' => 'O campo trainingID é obrigatório.',
        'start_date.required' => 'O campo inicio é obrigatório.',
        'expire_date.required' => 'O campo fim é obrigatório.',
        'start_date.date' => 'O campo inicio deve ser uma data.',
        'expire_date.date' => 'O campo fim deve ser uma data.'
    ];
}
