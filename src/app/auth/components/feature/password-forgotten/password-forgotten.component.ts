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
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-password-forgotten',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
    RouterModule,
  ],
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.scss'],
})
export class PasswordForgottenComponent implements OnInit {
  forgottenPasswordForm!: FormGroup;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.forgottenPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get email() {
    return this.forgottenPasswordForm.get('email');
  }

  onSubmit() {
    if (this.forgottenPasswordForm.valid) {
      this.authService.passwordForgotten(this.email?.value);
    }
  }
}
