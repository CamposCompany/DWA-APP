<?php

namespace App\Http\Requests\TrainingExercises;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\TrainingExercise;

class TrainingAttachExerciseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return collect(['owner', 'admin', 'personal'])->contains(function ($role) {
            return auth()->user()->hasRole($role);
        });
    }

    public function rules(): array
    {
        return [
            'exercises' => 'required|array',
            'exercises.*.id' => 'required|exists:exercises,id',
            'exercises.*.series' => 'required|integer|min:1',
            'exercises.*.repetitions' => 'required|integer|min:1',
            'exercises.*.rest' => 'required|integer|min:1',
            'exercises.*.comments' => 'nullable|string',
        ];
    }

    /**
     * Custom validation rules.
     */
    protected function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $trainingId = $this->route('training');
            $exercises = $this->input('exercises');

            $duplicates = collect($exercises)->filter(function ($exercise) use ($trainingId) {
                return TrainingExercise::where('training_id', $trainingId)
                            ->where('exercise_id', $exercise['id'])
                            ->exists();
            });

            if ($duplicates->isNotEmpty()) {
                $validator->errors()->add(
                    'exercises',
                    'Um ou mais exercícios já estão vinculados a este treino: ' . $duplicates->pluck('id')->join(', ')
                );
            }

            $allowedFields = ['id', 'series', 'repetitions', 'rest', 'comments'];
            foreach ($exercises as $index => $exercise) {
                $extraFields = array_diff(array_keys($exercise), $allowedFields);
                if (!empty($extraFields)) {
                    $validator->errors()->add(
                        "exercises.$index",
                        'Os seguintes campos não são permitidos: ' . implode(', ', $extraFields)
                    );
                }
            }
        });
    }

    public function messages(): array
    {
        return [
            'exercises.required' => 'O campo exercises é obrigatório.',
            'exercises.array' => 'O campo exercises deve ser um array.',
            'exercises.*.id.required' => 'O campo id do exercício é obrigatório.',
            'exercises.*.id.exists' => 'O exercício informado não existe.',
            'exercises.*.series.required' => 'O campo series é obrigatório.',
            'exercises.*.series.integer' => 'O campo series deve ser um número inteiro.',
            'exercises.*.series.min' => 'O campo series deve ser pelo menos 1.',
            'exercises.*.repetitions.required' => 'O campo repetitions é obrigatório.',
            'exercises.*.repetitions.integer' => 'O campo repetitions deve ser um número inteiro.',
            'exercises.*.repetitions.min' => 'O campo repetitions deve ser pelo menos 1.',
            'exercises.*.rest.required' => 'O campo rest é obrigatório.',
            'exercises.*.rest.integer' => 'O campo rest deve ser um número inteiro.',
            'exercises.*.rest.min' => 'O campo rest deve ser pelo menos 1 segundo.',
            'exercises.*.comments.string' => 'O campo comments deve ser uma string.',
        ];
    }
}
