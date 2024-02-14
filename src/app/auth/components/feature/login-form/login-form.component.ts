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
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { UserAuth } from 'src/app/auth/models/user-auth.model';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { LocalStorageService } from 'src/app/auth/shared/local-storage.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-login-form',
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
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  userAuth: UserAuth = new UserAuth('', '');

  constructor(
    public authService: AuthService,
    private localService: LocalStorageService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    this.userAuth = new UserAuth(this.email.value, this.password.value);
    this.localService.clearToken();
    this.authService.signIn(this.userAuth);
    this.toastService.showSuccess('bravo félicitations', 'Connexion réussie');
  }
}
