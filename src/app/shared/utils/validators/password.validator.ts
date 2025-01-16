import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('password_confirmation')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}

export function encodePasswordFields<T extends Record<string, any>>(
  formValues: T,
  fieldsToEncode: (keyof T)[]
): T {
  const updatedValues = { ...formValues };

  fieldsToEncode.forEach((field) => {
    const value = updatedValues[field];

    if (typeof value === 'string') {
      updatedValues[field] = btoa(value) as T[keyof T];
    }
  });

  return updatedValues;
}




