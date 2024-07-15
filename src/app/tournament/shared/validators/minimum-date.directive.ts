import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minimumDate(limitDate: Date = new Date()): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlDate: Date = new Date(control.value);

    if (controlDate <= limitDate) {
      return { minimumDate: true };
    }

    return null;
  };
}
