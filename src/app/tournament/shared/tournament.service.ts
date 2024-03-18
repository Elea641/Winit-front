import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Tournament } from '../models/tournament.model';
import { TournamentDetails } from '../models/tournament-details.model';
import { TournamentCreationDto } from '../models/tournament-creation-dto.model';

import { ToastService } from 'src/app/shared/toast.service';
import { TournamentMappers } from './mappers/TournamentMappers';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private tournamentDataUrl = '../assets/list-tournament.model.json';
  private apiUrl = `${environment.urlApi}` + "/tournaments/create";
  private tournamentByIdDataUrl = '../assets/tournament-details.model.json';

    constructor(
      private http: HttpClient,
      private router: Router,
      private toastService: ToastService,
      private tournamentMappers: TournamentMappers) {}

    createTournament(newTournament: TournamentCreationDto): void {
      const tournamentCreationDto = this.tournamentMappers.ToFormData(newTournament);

      const headers = new HttpHeaders();
      headers.append('Content-type', 'multipart/form-data');

      this.http.post<Tournament>(this.apiUrl, tournamentCreationDto, { headers }).subscribe(
        (response) => {
          console.warn("Response: ", response);
          if (response) {
            console.log("success");
            this.router.navigate(['/tournament/' + response]);
            this.toastService.showSuccess(
              "Votre tournoi est prêt !",
              "Tournoi créé avec succès"
            );
          }
        },
        (error) => {
          console.error("Error: ", error);
          const errorMessage = error?.error?.error_message || 'Une erreur est survenue';
          this.toastService.showError(
            errorMessage,
            "Erreur lors de la création du tournoi"
          );
          return throwError(() => new Error(error));
        });
    }

    getAllTournaments(): Observable<Tournament[]> {
      return this.http.get<Tournament[]>(this.tournamentDataUrl);
    }
  
    getTournamentById(): Observable<TournamentDetails> {
      return this.http.get<TournamentDetails>(this.tournamentByIdDataUrl);
    }
}
