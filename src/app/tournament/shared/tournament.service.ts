import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TournamentCreationDto } from '../models/tournament-creation-dto.model';
import { TournamentDetails } from '../models/tournament-details.model';
import { Tournament } from '../models/tournament.model';
import { ToastService } from 'src/app/shared/toast.service';
import { TournamentMappers } from './mappers/TournamentMappers';
import { TournamentCard } from '../models/tournament-card.model';
import { ITournamentService } from './interfaces/ITournament.service';

import { TournamentUpdate } from '../models/tournamentUpdate.model';
import { SelectTeam } from '../models/selectTeam.model';

@Injectable({
  providedIn: 'root',
})
export class TournamentService implements ITournamentService {
  private tournamentDataUrl = `${environment.urlApi}/tournaments/`;
  private teamInscriptionSubject: Subject<{
    name: string;
    result: number;
    url: string;
  }> = new Subject<{ name: string; result: number; url: string }>();
  public teamInscription$: Observable<{
    name: string;
    result: number;
    url: string;
  }> = this.teamInscriptionSubject.asObservable();

  private inscriptionSubject: Subject<boolean> = new Subject<boolean>();
  public inscription$: Observable<boolean> =
    this.inscriptionSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private tournamentMappers: TournamentMappers
  ) {}

  getAllTournaments(): Observable<TournamentCard[]> {
    return this.http.get<any>(this.tournamentDataUrl);
  }

  getTournamentById(id: number): Observable<TournamentDetails> {
    return this.http.get<TournamentDetails>(
      `${environment.urlApi}/tournaments/` + id
    );
  }

  createTournament(newTournament: TournamentCreationDto): void {
    const tournamentCreationDto =
      this.tournamentMappers.ToFormData(newTournament);

    const headers = new HttpHeaders();
    headers.append('Content-type', 'multipart/form-data');

    this.http
      .post<Tournament>(
        `${environment.urlApi}/tournaments`,
        tournamentCreationDto,
        { headers }
      )
      .subscribe(
        (response) => {
          if (response) {
            this.router.navigate(['/tournament/' + response]);
            this.toastService.showSuccess(
              'Votre tournoi est prêt !',
              'Tournoi créé avec succès'
            );
          }
        },
        (error) => {
          const errorMessage = error?.error?.error_message;
          this.toastService.showError(
            error.error,
            'Erreur lors de la création du tournoi'
          );
          return throwError(() => new Error(error));
        }
      );
  }

  addTeamToTournament(selectTeam: SelectTeam): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http
        .post<SelectTeam>(`${environment.urlApi}/tournaments/teams`, selectTeam)
        .subscribe(
          (response) => {
            if (response) {
              this.teamInscriptionSubject.next({
                name: selectTeam.teamName,
                result: 0,
                url: '',
              });
              this.inscriptionSubject.next(true);
              observer.next(true);
              observer.complete();
              this.toastService.showSuccess(
                'Bravo félicitations',
                "L'ajout de votre équipe au tournoi a bien été prise en compte"
              );
            }
          },
          (error) => {
            if (error.error) {
              this.toastService.showError(
                error.error,
                "Une erreur est survenue lors de l'enregistrement"
              );
              observer.next(false);
              observer.complete();
            }
          }
        );
    });
  }

  deleteTeamToTournament(
    tournamentId: number,
    team: { name: string; result: number; url: string }
  ): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http
        .delete<any>(
          `${environment.urlApi}/tournaments/teams/${tournamentId}/${team.name}`
        )
        .subscribe(
          (response) => {
            if (response) {
              this.toastService.showSuccess(
                'Suppression',
                "L'équipe a été supprimée avec succès"
              );
              this.inscriptionSubject.next(false);
              observer.next(true);
              observer.complete();
            }
          },
          (error) => {
            if (error.error) {
              this.toastService.showError(
                error.error,
                'Une erreur est survenue lors de la suppression'
              );
            }
            observer.next(false);
            observer.complete();
          }
        );
    });
  }

  updateTournament(tournamentId: number) {
    const isGenerated: TournamentUpdate = {
      isGenerated: true,
    };

    this.http
      .put<TournamentUpdate>(
        `${environment.urlApi}/tournaments/${tournamentId}`,
        {
          isGenerated: true,
        }
      )
      .subscribe(
        (response) => {
          if (response) {
            this.router.navigate(['/tournament/' + tournamentId]);
            this.toastService.showSuccess(
              'Votre tournoi est prêt !',
              'Tournoi généré avec succès'
            );
          }
        },
        (error) => {
          const errorMessage =
            error?.error?.error_message || 'Une erreur est survenue';
          this.toastService.showError(
            error.error,
            'Erreur lors de la création du tournoi'
          );
          return throwError(() => new Error(error));
        }
      );
  }

  deleteTournament(tournamentDetails: TournamentDetails): void {
    this.http
      .delete<any>(
        `${environment.urlApi}/tournaments/${tournamentDetails.name}`
      )
      .subscribe(
        (response) => {
          if (response) {
            this.toastService.showSuccess(
              'Suppression',
              'Le tournoi a été supprimée avec succès'
            );
            this.router.navigate(['/']);
          }
        },
        (error) => {
          if (error.error) {
            this.toastService.showError(
              error.error,
              'Une erreur est survenue lors de la suppression du tournoi'
            );
          }
        }
      );
  }
}
