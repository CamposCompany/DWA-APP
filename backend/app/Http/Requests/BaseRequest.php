<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

abstract class BaseRequest extends FormRequest
{
    protected array $allowedRoles = [];
    protected array $allowedFields = [];
    protected array $customMessages = [];

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (empty($this->allowedRoles)) {
            return true;
        }

        $user = auth()->user();
        if (!$user) {
            return false;
        }

        return collect($this->allowedRoles)->contains(fn ($role) => $user->hasRole($role));
    }

    /**
     * Validate the request inputs.
     */
    protected function withValidator(Validator $validator): void
    {
        if ($this->allowedFields === []) {
            return;
        }

        $validator->after(function (Validator $validator): void {
            $extraFields = array_diff(array_keys($this->all()), $this->allowedFields);

            if ($extraFields !== []) {
                $validator->errors()->add(
                    'fields',
                    'Os seguintes campos não são permitidos: ' . implode(', ', $extraFields)
                );
            }
        });
    }

    /**
     * Get the validation messages.
     */
    public function messages(): array
    {
        return $this->customMessages;
    }
}
