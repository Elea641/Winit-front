import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {User} from "../../../../auth/models/user.model";
import {ProfileService} from "../../../shared/profile.service";
import {ToastService} from "../../../../shared/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-profile-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-profile-dialog.component.html',
  styleUrls: ['./delete-profile-dialog.component.scss']
})
export class DeleteProfileDialogComponent implements OnInit {

  currentUser!: User;

  constructor(
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.profileService.getCurrentUser().subscribe(
      (currentUser) => {
        this.currentUser = currentUser;
      });
  }

  deleteProfile() {
    if (this.currentUser.id) {
      this.profileService.deleteProfile(this.currentUser.id)
        .subscribe((response) => {
            console.log('Profile successfully deleted: ', response);
            this.goToDisconnected('/');
            this.toastService.showSuccess(
              'Votre profil a bien été supprimé.',
              'Succès !'
            );
          },
          (error) => {
            console.error('Profile could not be deleted: ', error);
            this.toastService.showError(
              'Votre profil n\'a pas pu être supprimé, veuillez réessayer ultérieurement.',
              'Une erreur est survenue'
            );
          }
        );
    }
  }

  goToDisconnected(url: string) {
    localStorage.clear();
    this.router.navigate([url]).then(() => {
      window.location.reload();
    });
  }
}
