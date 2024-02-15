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
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from 'src/app/auth/shared/local-storage.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Sport } from '../../../models/sport.model';
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
  sports: Sport[] = [
    { name: 'basketball', viewName: 'Basketball' },
    { name: 'esport', viewName: 'E-sport' },
    { name: 'football', viewName: 'Football' },
    { name: 'handball', viewName: 'Handball' },
    { name: 'petanque', viewName: 'Pétanque' },
    { name: 'volleyball', viewName: 'Volleyball' },
    { name: 'waterpolo', viewName: 'Water-polo' },
  ];
  registerForm!: FormGroup;
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    sport: this.sports[0],
    password: '',
    requiredRole: 'ROLE_USER',
    enabled: true,
  };

  public isMailTaken: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private localService: LocalStorageService,
    private toastService: ToastService
  ) {}

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
        email: new FormControl(this.user.email, [
          Validators.required,
          Validators.email,
        ]),
        sport: new FormControl(this.user.sport, []),
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

  get email() {
    return this.registerForm.get('email')!;
  }

  get sport() {
    return this.registerForm.get('sport')!;
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
    const newUser: User = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      sport: this.sport.value,
      email: this.email.value,
      password: this.password.value,
      requiredRole: 'ROLE_USER',
      createdAt: new Date(),
      enabled: true,
    };

    this.authService.postRegister(newUser).subscribe(
      (response) => {
        if (response) {
          this.localService.clearToken();
          this.router.navigate(['/auth/login']);
          this.toastService.showSuccess(
            'Vous pouvez vous connecter',
            'Compte créé avec succès'
          );
        }
      },
      (error) => {
        console.log(error);

        if (error.error.error_message == 'Email already taken.') {
          console.log(error.error.error_message, 'dedans');

          this.isMailTaken = true;
          this.registerForm.controls['email'].setErrors({
            isMailTaken: true,
          });
        }
      }
    );
  }
}
