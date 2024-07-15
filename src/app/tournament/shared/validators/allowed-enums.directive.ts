import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function enumValidator(enumObject: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const enumValues = Object.values(enumObject);

    if (value) {
      for (const enumValue of enumValues) {
        if (enumValue == value) {
          return null;
        }
      }
      return { enum: true };
    } else {
      return { enum: true };
    }
  };
}
