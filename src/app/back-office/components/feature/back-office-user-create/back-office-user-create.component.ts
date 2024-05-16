import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatInputModule } from '@angular/material/input';
import { passwordValidator } from '../../../../auth/core/password.validator';
import { checkPasswordMatch } from '../../../../auth/shared/password-match';
import { AdminUser } from '../../../models/admin-user.model';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BackOfficeUserService } from '../../../shared/back-office-user.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../../shared/toast.service';

@Component({
  selector: 'app-back-office-user-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSlideToggleModule,
    RouterLink,
  ],
  templateUrl: './back-office-user-create.component.html',
  styleUrls: ['./back-office-user-create.component.scss'],
})
export class BackOfficeUserCreateComponent implements OnInit {
  createUserForm!: FormGroup;
  user: AdminUser = {};

  constructor(
    private backOfficeUserService: BackOfficeUserService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.createUserForm = new FormGroup(
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
        requiredRole: new FormControl(this.user.requiredRole, [
          Validators.required,
        ]),
        enabled: new FormControl(this.user.enabled, []),
      },
      { validators: checkPasswordMatch }
    );
  }

  confirmError() {
    this.createUserForm.get('confirmPassword')?.setErrors({ invalid: true });
    this.createUserForm.get('confirmPassword')?.markAsTouched();
  }

  get firstName() {
    return this.createUserForm?.get('firstName');
  }

  get lastName() {
    return this.createUserForm?.get('lastName');
  }

  get city() {
    return this.createUserForm?.get('city');
  }

  get email() {
    return this.createUserForm?.get('email');
  }

  get password() {
    return this.createUserForm?.get('password');
  }

  get confirmPassword() {
    return this.createUserForm?.get('confirmPassword');
  }

  get requiredRole() {
    return this.createUserForm?.get('requiredRole');
  }

  get enabled() {
    return this.createUserForm?.get('enabled');
  }

  onSubmit() {
    if (this.createUserForm.valid) {
      const newUser: AdminUser = {
        firstName: this.firstName?.value.trim(),
        lastName: this.lastName?.value.trim(),
        city: this.city?.value.trim(),
        email: this.email?.value.trim(),
        password: this.password?.value.trim(),
        requiredRole: this.requiredRole?.value,
        enabled: this.enabled?.value,
        createdAt: new Date(),
      };
      if (this.enabled?.value == null) {
        newUser.enabled = false;
      }

      this.backOfficeUserService.createUser(newUser).subscribe({
        next: response => {
          if (response) {
            this.router.navigate(['/back-office']);
            this.toastService.showSuccess('Le compte a été créé', 'Succès');
          }
        },
        error: error => {
          if (error.error.error_message === 'Email already taken.') {
            this.toastService.showError(
              'Un compte avec cette adresse mail existe déjà.',
              'Une erreur est survenue'
            );
          }
        },
      });
    }
  }
}
