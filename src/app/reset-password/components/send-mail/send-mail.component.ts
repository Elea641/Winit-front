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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-send-mail',
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
  ],
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss'],
})
export class SendMailComponent implements OnInit {
  sendResetPasswordMailForm!: FormGroup;
  e_mail!: string;

  ngOnInit(): void {
    this.sendResetPasswordMailForm = new FormGroup({
      email: new FormControl(this.e_mail, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  get email() {
    return this.sendResetPasswordMailForm.get('email')!;
  }
  onSubmit() {
    const email: string = this.email.value;
    console.log(email);
  }
}
