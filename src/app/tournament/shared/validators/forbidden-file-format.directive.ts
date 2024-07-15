import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenFileFormat(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file: File = control.value;
    if (file) {
      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/gif'
      ) {
        return { forbiddenFile: true };
      }
    }

    return null;
  };
}
