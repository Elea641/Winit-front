import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TournamentCreationDto } from '../models/tournament-creation-dto.type';
import { TournamentDetails } from '../models/tournament-details.type';
import { Tournament } from '../models/tournament.type';
import { ToastService } from 'src/app/shared/toast.service';
import { TournamentMappers } from './mappers/TournamentMappers';
import { TournamentCard } from '../models/tournament-card.type';
import { ITournamentService } from './interfaces/ITournament.service';
import { SelectTeam } from '../models/selectTeam.class';

@Injectable({
  providedIn: 'root',
})
export class TournamentService implements ITournamentService {
  private tournamentDataUrl = `${environment.urlApi}/tournaments/`;
  private teamInscriptionSubject: Subject<{
    name: string;
    result: number;
    url: string;
    currentUser: number;
    ownerId: number;
  }> = new Subject<{
    name: string;
    result: number;
    url: string;
    currentUser: number;
    ownerId: number;
  }>();
  public teamInscription$: Observable<{
    name: string;
    result: number;
    url: string;
    currentUser: number;
    ownerId: number;
  }> = this.teamInscriptionSubject.asObservable();

  private inscriptionSubject: Subject<boolean> = new Subject<boolean>();
  public inscription$: Observable<boolean> =
    this.inscriptionSubject.asObservable();

  public tournamentSubject: Subject<TournamentDetails> =
    new Subject<TournamentDetails>();
  public tournament$: Observable<TournamentDetails> =
    this.tournamentSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private tournamentMappers: TournamentMappers
  ) {}

  getAllTournaments(): Observable<TournamentCard[]> {
    return this.http.get<TournamentCard[]>(this.tournamentDataUrl);
  }

  getTournamentById(id: number): Observable<TournamentDetails> {
    return this.http.get<TournamentDetails>(
      `${environment.urlApi}/tournaments/` + id
    );
  }

  getAllTournamentsPaginated(): Observable<TournamentCard[]> {
    return this.http.get<TournamentCard[]>(
      `${environment.urlApi}` + '/pagination/?entityName=tournament'
    );
  }

  createTournament(newTournament: TournamentCreationDto): void {
    const tournamentCreationDto =
      this.tournamentMappers.toFormData(newTournament);

    const headers = new HttpHeaders();
    headers.append('Content-type', 'multipart/form-data');

    this.http
      .post<Tournament>(
        `${environment.urlApi}/tournaments/`,
        tournamentCreationDto,
        { headers }
      )
      .subscribe({
        next: response => {
          if (response) {
            this.router.navigate(['/tournament/' + response]);
            this.toastService.showSuccess(
              'Tournoi créé avec succès',
              'Votre tournoi est prêt !'
            );
          }
        },
        error: error => {
          if (error.error) {
            this.toastService.showError(
              error.error,
              'Erreur lors de la création du tournoi'
            );
          }
        },
      });
  }

  addTeamToTournament(selectTeam: SelectTeam): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http
        .post<SelectTeam>(
          `${environment.urlApi}/tournaments/teams/`,
          selectTeam
        )
        .subscribe({
          next: response => {
            if (response) {
              this.teamInscriptionSubject.next({
                name: selectTeam.teamName,
                result: 0,
                url: '',
                currentUser: 0,
                ownerId: 0,
              });
              this.inscriptionSubject.next(true);
              observer.next(true);
              observer.complete();
              this.toastService.showSuccess(
                "L'ajout de votre équipe au tournoi a bien été prise en compte",
                'Opération effectuée avec succès'
              );
            }
          },
          error: error => {
            if (error.error) {
              this.toastService.showError(
                error.error,
                "Une erreur est survenue lors de l'enregistrement"
              );
              observer.next(false);
              observer.complete();
            }
          },
        });
    });
  }

  deleteTeamFromTournament(
    tournamentId: number,
    team: { name: string; result: number; url: string }
  ): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http
        .delete<
          Observable<boolean>
        >(`${environment.urlApi}/tournaments/teams/${tournamentId}/${team.name}`)
        .subscribe({
          next: response => {
            if (response) {
              this.toastService.showSuccess(
                "L'équipe a été supprimée avec succès",
                'Suppression'
              );
              this.inscriptionSubject.next(false);
              observer.next(true);
              observer.complete();
            }
          },
          error: error => {
            if (error.error) {
              this.toastService.showError(
                error.error,
                'Une erreur est survenue lors de la suppression'
              );
            }
          },
        });
    });
  }

  updateTournament(
    tournamentId: number,
    generatedTree: { randomPhaseMatches: object; remainingPhaseMatches: object }
  ) {
    this.http
      .put<TournamentDetails>(
        `${environment.urlApi}/tournaments/${tournamentId}`,
        {
          isGenerated: true,
          isCanceled: false,
          matches: generatedTree,
        }
      )
      .subscribe({
        next: response => {
          if (response) {
            this.tournamentSubject.next(response);
            this.router.navigate(['/tournament/' + tournamentId]);
            this.toastService.showSuccess(
              'Tournoi généré avec succès',
              'Votre tournoi est prêt !'
            );
          }
        },
        error: error => {
          if (error.error) {
            this.toastService.showError(
              error.error,
              'Erreur lors de la création du tournoi'
            );
          }
        },
      });
  }

  cancelTournament(tournamentId: number, isCanceled: boolean) {
    this.http
      .put<TournamentDetails>(
        `${environment.urlApi}/tournaments/${tournamentId}`,
        {
          isGenerated: true,
          isCanceled: isCanceled,
        }
      )
      .subscribe({
        next: response => {
          if (response) {
            this.tournamentSubject.next(response);
            this.router.navigate(['/tournament/' + tournamentId]);
            this.toastService.showSuccess(
              'Annulé avec succès',
              'Votre tournoi'
            );
          }
        },
        error: error => {
          if (error.error) {
            this.toastService.showError(
              error.error,
              'Erreur lors de la création du tournoi'
            );
          }
        },
      });
  }

  deleteTournament(tournamentDetails: TournamentDetails): void {
    this.http
      .delete<string>(
        `${environment.urlApi}/tournaments/${tournamentDetails.name}`
      )
      .subscribe({
        next: response => {
          if (response) {
            this.toastService.showSuccess(
              'Le tournoi a été supprimée avec succès',
              'Suppression'
            );
            this.router.navigate(['/']);
          }
        },
        error: error => {
          if (error.error) {
            this.toastService.showError(
              error.error,
              'Une erreur est survenue lors de la suppression du tournoi'
            );
          }
        },
      });
  }
}
