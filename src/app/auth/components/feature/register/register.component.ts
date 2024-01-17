import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { Sport } from '../../../models/sport.model';
import { User } from '../../../models/user.model';
import { checkPasswordMatch } from '../../../shared/password-match';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../../shared/auth.service';
import { Router } from '@angular/router';

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

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    sport: this.sports[0],
    password: '',
    roles: { id: 1 },
    enabled: true,
  };

  registerForm!: FormGroup;

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

  constructor(public authService: AuthService, private router: Router) {}

  onSubmit() {
    const newUser: User = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      sport: this.sport.value,
      email: this.email.value,
      password: this.password.value,
      roles: { id: 1 },
      createdAt: new Date(),
      enabled: true,
    };

    this.authService.postRegister(newUser).subscribe(
      (response) => {
        if (response === null) {
          console.log('Response:', 'The form is invalid');
        } else {
          console.log('Response:', response);
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
