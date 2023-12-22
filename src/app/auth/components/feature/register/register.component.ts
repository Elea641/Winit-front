import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSelectModule} from "@angular/material/select";
import {Sport} from "../../../models/sport.model";

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
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder) {}

  registerForm = this.fb.group({
    firstName: ['', [
      Validators.required,
      Validators.maxLength(25)
    ]],
    lastName: ['', [
      Validators.required,
      Validators.maxLength(25)
    ]],
    sport: ['', [
      Validators.required
    ]],
    email: ['', [
      Validators.required,
      Validators.email,
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]],
    confirmPassword: ['', [
      Validators.required,
      Validators.minLength(8)
    ]]
  })

  sports: Sport[] = [
    {name: 'football', viewName: 'Football'},
    {name: 'basketball', viewName: 'Basketball'},
    {name: 'volleyball', viewName: 'Volleyball'},
    {name: 'handball', viewName: 'Handball'},
    {name: 'esport', viewName: 'E-sport'},
  ];

  getErrorMessage(controlName: string) {
    const control = this.registerForm.get(controlName);

    if (control?.invalid) {
      return 'Champ invalide';
    }

    return '';
  }

  onSubmit() {

  }
}
