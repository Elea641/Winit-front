import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { DropzoneMaterialModule } from '@ngx-dropzone/material';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    DropzoneCdkModule,
    DropzoneMaterialModule,
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Input() groupParent!: FormGroup;
  @Input() formControlNameValue!: string;
  @Input() labelValue!: string;

  clearUploadFile() {
    this.groupParent.controls[this.formControlNameValue].setValue(null);
    this.groupParent.controls[
      this.formControlNameValue
    ].updateValueAndValidity();
  }

  getControlErrors(control: AbstractControl) {
    const errors = [];
    if (control.errors) {
      for (const errorKey in control.errors) {
        if (Object.prototype.hasOwnProperty.call(control.errors, errorKey)) {
          errors.push(this.getErrorMessage(errorKey, control.errors[errorKey]));
        }
      }
    }
    return errors;
  }

  getErrorMessage(errorKey: any, errorValue: any) {
    if (errorKey === 'required') {
      return 'This field is required.';
    } else if (errorKey === 'minlength') {
      return `Minimum length is ${errorValue.requiredLength}.`;
    }

    return 'Validation error.';
  }
}
