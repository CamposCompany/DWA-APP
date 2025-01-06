<?php

namespace App\Http\Requests\UserTrainingExercises;

use App\Models\UserTrainingExercise;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UserTrainingExerciseStoreRequest extends FormRequest
{
    public function authorize() :bool {
        return collect(['owner', 'admin', 'personal'])->contains(function ($role) {
            return auth()->user()->hasRole($role);
        });
    }

    public function rules() {
        return [
            'exercises' => 'required|array',
            'exercises.*.exercise_id' => 'required|string',
            'exercises.*.series' => 'required|string',
            'exercises.*.repetitions' => 'required|string',
            'exercises.*.rest' => 'required|string',
            'exercises.*.comments' => 'string|max:255',
            'exercises.*.weight' => 'string'
        ];
    }

    public function messages() {
        return [
            'exercise_id.required' => 'O campo id do exercício é obrigatório.',
            'repetitions.required' => 'O campo repetições é obrigatório.',
            'series.required' => 'O campo séries é obrigatório.',
            'rest.required' => 'O campo descanso é obrigatório.',
        ];
    }

    protected function withValidator(Validator $validator) {
        $validator->after(function ($validator) {
            $trainingId = $this->route('userTraining');
            $exercises = $this->input('exercises');
    
            $duplicates = collect($exercises)->filter(function ($exercise) use ($trainingId) {
                return UserTrainingExercise::where('user_trainingID', $trainingId)
                    ->where('exercise_id', $exercise['exercise_id'])
                    ->exists();
            });
    
            if ($duplicates->isNotEmpty()) {
                $validator->errors()->add(
                    'exercises',
                    'Um ou mais exercícios já estão vinculados a este treino: ' . $duplicates->pluck('id')->join(', ')
                );
            }

            $allowedFields = ['exercises', 'exercise_id', 'user_trainingID', 'series', 'rest', 'comments', 'weight', 'active', 'repetitions'];
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