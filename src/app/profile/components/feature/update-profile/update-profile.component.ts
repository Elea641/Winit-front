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
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../../auth/models/user.model';
import { ProfileService } from '../../../shared/profile.service';
import { ToastService } from '../../../../shared/toast.service';
import { Router } from '@angular/router';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';
import { CurrentUser } from 'src/app/auth/models/current-user.model';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    DeleteProfileComponent,
  ],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm!: FormGroup;
  currentUser!: CurrentUser;

  constructor(
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileService.getCurrentUser().subscribe(
      (currentUser) => {
        this.currentUser = currentUser;
        this.updateProfileForm.patchValue({
          firstName: this.currentUser.firstName,
          lastName: this.currentUser.lastName,
          city: this.currentUser.city,
          email: this.currentUser.email,
        });
      },
      (error) => {
        console.error('Profile could not be updated: ', error);
        this.router.navigate(['/auth/login']);
        this.toastService.showError(
          'Veuillez vous connecter pour mettre à jour votre profil.',
          'Accès refusé'
        );
      }
    );

    this.updateProfileForm = new FormGroup({
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
    });
  }

  get firstName() {
    return this.updateProfileForm.get('firstName')!;
  }

  get lastName() {
    return this.updateProfileForm.get('lastName')!;
  }

  get city() {
    return this.updateProfileForm.get('city')!;
  }

  get email() {
    return this.updateProfileForm.get('email')!;
  }

  onSubmit() {
    if (this.updateProfileForm.valid && this.currentUser.id) {
      this.profileService
        .updateProfile(this.currentUser.id, this.updateProfileForm.value)
        .subscribe(
          (response) => {
            console.log(
              'Profile has been successfully updated: ',
              this.updateProfileForm.value
            );
            this.toastService.showSuccess(
              'Votre profil a bien été modifié.',
              'Succès !'
            );
            this.router.navigate(['/profile']);
          },
          (error) => {
            console.error('Profile could not be updated: ', error);
            this.toastService.showError(
              "Votre profil n'a pas pu être mis à jour, veuillez réessayer ultérieurement.",
              'Une erreur est apparue'
            );
          }
        );
    }
  }
}
