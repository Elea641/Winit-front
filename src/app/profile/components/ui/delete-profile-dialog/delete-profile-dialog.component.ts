import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProfileService } from '../../../shared/profile.service';
import { ToastService } from '../../../../shared/toast.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/shared/user.service';
import { MatIconModule } from '@angular/material/icon';
import { User } from 'src/app/auth/models/user.type';

@Component({
  selector: 'app-delete-profile-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './delete-profile-dialog.component.html',
  styleUrls: ['./delete-profile-dialog.component.scss'],
})
export class DeleteProfileDialogComponent implements OnInit {
  currentUser!: User;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  deleteProfile() {
    if (this.currentUser.id) {
      this.profileService.deleteProfile(this.currentUser.id).subscribe({
        next: () => {
          this.goToDisconnected('/');
          this.toastService.showSuccess(
            'Votre profil a bien été supprimé.',
            'Succès !'
          );
        },
        error: error => {
          if (error.error) {
            this.toastService.showError(
              "Votre profil n'a pas pu être supprimé, veuillez réessayer ultérieurement.",
              'Une erreur est survenue'
            );
          }
        },
      });
    }
  }

  goToDisconnected(url: string) {
    localStorage.clear();
    this.router.navigate([url]).then(() => {
      window.location.reload();
    });
  }
}
