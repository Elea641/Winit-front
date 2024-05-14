import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export const maximumDate: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const date = control.get('date');
  const inscriptionLimitDate = control.get('inscriptionLimitDate');

  if (inscriptionLimitDate?.hasValidator(Validators.required)) {
    if (new Date(date?.value) <= new Date(inscriptionLimitDate.value)) {
      inscriptionLimitDate.setErrors({ maximumDate: true });
      return { maximumDate: true };
    }

    return null;
  }

  return null;
};
