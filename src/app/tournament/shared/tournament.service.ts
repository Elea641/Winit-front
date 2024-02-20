import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { TournamentDetails } from '../models/tournament-details.model';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/toast.service';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private tournamentDataUrl = '../assets/list-tournament.model.json';
  private apiUrl = `${environment.urlApi}` + "/tournaments";
  private tournamentByIdDataUrl = '../assets/tournament-details.model.json';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService) {}

  getAllTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentDataUrl);
  }

  createTournament(newTournament: AbstractControl): Observable<Tournament> {
    console.log(newTournament);

    return this.http.post<Tournament>(`${this.apiUrl}`, newTournament).pipe(
      tap((response: Tournament) => {
        console.log(response);
        this.router.navigate(['/tournament/' + response.id]);
        this.toastService.showSuccess(
          "Votre tournoi est prêt !",
          "Tournoi créé avec succès"
        );
      }),
      catchError((error: any) => {
        const errorMessage = error?.error?.error_message || 'Une erreur est survenue';
        this.toastService.showError(
          errorMessage,
          "Erreur lors de la création du tournoi"
        );
        return throwError(() => new Error(error));
      })
    );
  }
  
  getTournamentById(): Observable<TournamentDetails> {
    return this.http.get<TournamentDetails>(this.tournamentByIdDataUrl);
  }
}
