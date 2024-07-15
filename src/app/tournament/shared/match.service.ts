import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatchUpdate } from '../models/matchUpdate.type';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/toast.service';
import { TournamentService } from './tournament.service';
import { TournamentDetails } from '../models/tournament-details.type';
import { IMatchService } from './interfaces/IMatch.service';

@Injectable({
  providedIn: 'root',
})
export class MatchService implements IMatchService {
  constructor(
    private http: HttpClient,
    private tournamentService: TournamentService,
    private toastService: ToastService
  ) {}

  updateMatch(matchUpdate: MatchUpdate) {
    this.http
      .put<TournamentDetails>(
        `${environment.urlApi}/matches/${matchUpdate.id}`,
        matchUpdate
      )
      .subscribe({
        next: response => {
          if (response) {
            this.tournamentService.tournamentSubject.next(response);
            if (response) {
              this.toastService.showSuccess(
                'Le score est mis à jour',
                'Validation du match'
              );
            }
          }
        },
        error: error => {
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
