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
import { User } from '../../../models/user.model';
import { AuthService } from '../../../shared/auth.service';
import { checkPasswordMatch } from '../../../shared/password-match';

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
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    requiredRole: 'ROLE_USER',
    enabled: true,
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl(this.user.firstName, [
          Validators.required,
          Validators.maxLength(25),
        ]),
        lastName: new FormControl(this.user.lastName, [
          Validators.required,
          Validators.maxLength(25),
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.maxLength(25),
        ]),
        email: new FormControl(this.user.email, [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl(this.user.password, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
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
    return this.registerForm.get('firstName')!;
  }

  get lastName() {
    return this.registerForm.get('lastName')!;
  }

  get city() {
    return this.registerForm.get('city')!;
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }

  get acceptTerms() {
    return this.registerForm.get('acceptTerms')!;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newUser: User = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        city: this.city.value,
        email: this.email.value,
        password: this.password.value,
        requiredRole: 'ROLE_USER',
        createdAt: new Date(),
        enabled: true,
      };

      this.authService.postRegister(newUser);
    }
  }
}
