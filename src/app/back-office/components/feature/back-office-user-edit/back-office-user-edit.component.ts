import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { AdminUser } from '../../../models/admin-user.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BackOfficeUserService } from '../../../shared/back-office-user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ToastService } from '../../../../shared/toast.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-back-office-user-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    RouterLink,
    MatSlideToggleModule,
  ],
  templateUrl: './back-office-user-edit.component.html',
  styleUrls: ['./back-office-user-edit.component.scss'],
})
export class BackOfficeUserEditComponent implements OnInit {
  user: AdminUser | undefined;
  editUserForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: BackOfficeUserService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.route.params) {
      this.route.params.subscribe(params => {
        const id = params['id([0-9]+)'];
        this.getUserDetails(id);
      });
    }

    this.editUserForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      enabled: new FormControl('', [Validators.required]),
      requiredRole: new FormControl('', [Validators.required]),
    });
  }

  private getUserDetails(id: number) {
    this.userService.getUserById(id).subscribe((user: AdminUser) => {
      this.user = user;
      this.patchValues(user);
    });
  }

  private patchValues(user: AdminUser) {
    this.editUserForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      email: user.email,
      enabled: user.enabled,
      requiredRole: user.requiredRole,
    });
  }

  get firstName() {
    return this.editUserForm?.get('firstName');
  }

  get lastName() {
    return this.editUserForm?.get('lastName');
  }

  get city() {
    return this.editUserForm?.get('city');
  }

  get email() {
    return this.editUserForm?.get('email');
  }

  get enabled() {
    return this.editUserForm?.get('enabled');
  }

  get requiredRole() {
    return this.editUserForm?.get('requiredRole');
  }

  onSubmit() {
    if (this.editUserForm.valid) {
      this.route.params.subscribe(params => {
        const userId = params['id([0-9]+)'];
        this.userService.editUser(userId, this.editUserForm.value).subscribe({
          next: () => {
            this.toastService.showSuccess(
              "L'utilisateur a bien été mis à jour.",
              'Succès !'
            );
            this.router.navigate(['/back-office']);
          },
          error: () => {
            this.toastService.showError(
              "L'utilisateur n'a pas pu être mis à jour, veuillez réessayer ultérieurement.",
              'Une erreur est survenue'
            );
          },
        });
      });
    }
  }
}
