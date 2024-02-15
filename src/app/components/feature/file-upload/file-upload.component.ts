import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';

import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { DropzoneMaterialModule } from '@ngx-dropzone/material';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() groupParent!: FormGroup;
  @Input() formControlNameValue!: string;
  @Input() labelValue!: string;

  ngOnInit(): void {
    this.clearUploadFile();
  }

  clearUploadFile() {
    this.groupParent.controls[this.formControlNameValue].setValue(null);
  }

  getControlErrors(control: AbstractControl) {
    const errors = [];
    if (control.errors) {
      for (const errorKey in control.errors) {
        if (control.errors.hasOwnProperty(errorKey)) {
          errors.push(this.getErrorMessage(errorKey, control.errors[errorKey]));
        }
      }
      console.log(errors);
    }
    return errors;
  }

  getErrorMessage(errorKey: any, errorValue: any) {
    // Customize error messages based on error key and value
    if (errorKey === 'required') {
      return 'This field is required.';
    } else if (errorKey === 'minlength') {
      return `Minimum length is ${errorValue.requiredLength}.`;
    }
    // Add more conditions based on your validation criteria
    return 'Validation error.';
  }
}
