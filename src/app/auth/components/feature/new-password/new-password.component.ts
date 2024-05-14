import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NewPassword } from 'src/app/auth/models/newPassword.class';
import { ActivatedRoute } from '@angular/router';
import { passwordValidator } from 'src/app/auth/core/password.validator';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
  ],
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup;
  doPasswordsMatch = true;
  token = String(this.route.snapshot.paramMap.get('token'));

  constructor(
    public authService: AuthService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newPasswordForm = new FormGroup({
      plainPassword: new FormControl('', [
        Validators.required,
        passwordValidator,
      ]),
      plainPasswordVerification: new FormControl('', [
        Validators.required,
        passwordValidator,
      ]),
    });
  }

  get plainPassword() {
    return this.newPasswordForm.get('plainPassword');
  }

  get plainPasswordVerification() {
    return this.newPasswordForm.get('plainPasswordVerification');
  }

  onSubmit() {
    if (this.plainPassword?.value !== this.plainPasswordVerification?.value) {
      this.doPasswordsMatch = false;
    } else {
      this.doPasswordsMatch = true;
      const newPassword: NewPassword = {
        plainPassword: this.plainPassword?.value,
        plainPasswordVerification: this.plainPasswordVerification?.value,
      };
      this.authService.newPassword(this.token, newPassword);
    }
  }
}
