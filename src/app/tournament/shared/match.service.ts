import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatchUpdate } from '../models/matchUpdate.model';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/toast.service';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private http: HttpClient, private toastService: ToastService) {}

  updateMatch(matchUpdate: MatchUpdate) {
    this.http
      .put<MatchUpdate>(
        `${environment.urlApi}/matches/${matchUpdate.id}`,
        matchUpdate
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.toastService.showSuccess(
              'Le score est mis à jour',
              'Validation du match'
            );
          }
        },
        error: (error) => {
          if (error.error) {
            this.toastService.showError(
              error.error,
              'Erreur lors de la mise à jour du match'
            );
          }
        },
      });
  }
}
