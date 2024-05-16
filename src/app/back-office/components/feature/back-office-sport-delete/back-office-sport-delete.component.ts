import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BackOfficeSportService } from '../../../shared/back-office-sport.service';
import { ToastService } from '../../../../shared/toast.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-back-office-sport-delete',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './back-office-sport-delete.component.html',
  styleUrls: ['./back-office-sport-delete.component.scss'],
})
export class BackOfficeSportDeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { sportId: number },
    private backOfficeSportService: BackOfficeSportService,
    private toastService: ToastService,
    private router: Router
  ) {}

  deleteSport() {
    if (this.data.sportId) {
      this.backOfficeSportService.deleteSport(this.data.sportId).subscribe({
        next: () => {
          this.router.navigate(['/back-office']);
          this.toastService.showSuccess(
            'Ce sport a bien été supprimé.',
            'Succès !'
          );
        },
        error: error => {
          if (error.error) {
            this.toastService.showError(
              'Ce sport ne peut pas être supprimé, mais vous pouvez le modifier.',
              'Une erreur est survenue'
            );
          }
        },
      });
    }
  }
}
