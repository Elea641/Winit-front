import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const checkPasswordMatch: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (control.value.password === control.value.confirmPassword) {
    return null;
  } else {
    return { noMatch: true };
  }
};
