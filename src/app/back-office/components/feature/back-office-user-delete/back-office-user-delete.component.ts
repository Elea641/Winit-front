import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BackOfficeUserService } from '../../../shared/back-office-user.service';
import { ToastService } from '../../../../shared/toast.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-back-office-user-delete',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './back-office-user-delete.component.html',
  styleUrls: ['./back-office-user-delete.component.scss'],
})
export class BackOfficeUserDeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private backOfficeUserService: BackOfficeUserService,
    private toastService: ToastService,
    private router: Router
  ) {}

  deleteUser() {
    if (this.data.userId) {
      this.backOfficeUserService.deleteUser(this.data.userId).subscribe({
        next: () => {
          this.router.navigate(['/back-office']);
          this.toastService.showSuccess(
            'Ce compte a bien été supprimé.',
            'Succès !'
          );
        },
        error: error => {
          if (error.error) {
            this.toastService.showError(
              'Ce compte ne peut pas être supprimé, mais vous pouvez le désactiver.',
              'Une erreur est survenue'
            );
          }
        },
      });
    }
  }
}
