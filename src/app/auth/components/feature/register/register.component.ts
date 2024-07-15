import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';
import { checkPasswordMatch } from '../../../shared/password-match';
import { passwordValidator } from 'src/app/auth/core/password.validator';
import { RegistrationUser } from 'src/app/auth/models/registration-user.type';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  user: RegistrationUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl(this.user.firstName, [
          Validators.required,
          Validators.maxLength(255),
        ]),
        lastName: new FormControl(this.user.lastName, [
          Validators.required,
          Validators.maxLength(255),
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.maxLength(255),
        ]),
        email: new FormControl(this.user.email, [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl(this.user.password, [
          Validators.required,
          Validators.minLength(8),
          passwordValidator,
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          passwordValidator,
        ]),
        acceptTerms: new FormControl(false, [
          Validators.required,
          Validators.requiredTrue,
        ]),
      },
      { validators: checkPasswordMatch }
    );
  }

  confirmError() {
    this.registerForm.get('confirmPassword')?.setErrors({ invalid: true });
    this.registerForm.get('confirmPassword')?.markAsTouched();
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get city() {
    return this.registerForm.get('city');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get acceptTerms() {
    return this.registerForm.get('acceptTerms');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newUser: RegistrationUser = {
        firstName: this.firstName?.value.trim().toLowerCase(),
        lastName: this.lastName?.value.trim().toLowerCase(),
        city: this.city?.value.trim().toLowerCase(),
        email: this.email?.value.trim(),
        password: this.password?.value.trim(),
        createdAt: new Date(),
        acceptTerms: this.acceptTerms?.value,
      };

      this.authService.postRegister(newUser);
    }
  }
}
