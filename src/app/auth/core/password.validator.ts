import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value as string;
  const errors: ValidationErrors = {};

  function checkRegex(regex: RegExp, errorKey: string) {
    if (!regex.test(value)) {
      errors[errorKey] = true;
    }
  }

  checkRegex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/,
    'invalidPassword'
  );
  checkRegex(/[@$!%*?&#]/, 'missingSpecialCharacter');
  checkRegex(/[a-z]/, 'missingLowercaseCharacter');
  checkRegex(/[A-Z]/, 'missingUppercaseCharacter');
  checkRegex(/[\d]/, 'missingNumber');

  return Object.keys(errors).length > 0 ? errors : null;
}
