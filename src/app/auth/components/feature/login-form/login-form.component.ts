import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
    RouterModule
  ],
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
  })
  export class LoginFormComponent implements OnInit{
    
    loginForm!: FormGroup;
    
    constructor(public authService: AuthService, private router: Router) {}
    
    ngOnInit(): void {
      
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
      })
    }
    
    get email() {
      return this.loginForm.get('email')!;
    }
    
    get password() {
      return this.loginForm.get('password')!;
    }
    
    onSubmit() {
      console.log(this.loginForm.value);
      
    }
  }