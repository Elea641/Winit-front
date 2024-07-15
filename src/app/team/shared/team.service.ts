import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team.type';
import { Observable, Subject, of } from 'rxjs';
import { ToastService } from 'src/app/shared/toast.service';
import { CreatedTeam } from '../models/created-team.class';
import { ITeamService } from './interfaces/ITeam.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService implements ITeamService {
  private teamSubject: Subject<Team | null> = new Subject<Team | null>();
  public team$: Observable<Team | null> = this.teamSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  getTeam() {
    return this.team$;
  }

  setTeam(team: Team) {
    this.team$ = of(team);
  }

  getAllTeamsByUser(): Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.urlApi}/teams/`);
  }

  getAllTeamsByUserForTournament(sport: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.urlApi}/teams/sport/${sport}`);
  }

  getTeamByTeamName(teamName: string): Observable<Team> {
    return this.http.get<Team>(`${environment.urlApi}/teams/${teamName}`);
  }

  addTeam(team: CreatedTeam): void {
    this.http
      .post<CreatedTeam>(`${environment.urlApi}/teams/`, team)
      .subscribe({
        next: response => {
          if (response) {
            this.router.navigate([`/teams-details/${team.name}`]);
            this.toastService.showSuccess(
              'Votre équipe a été créée',
              'Opération effectuée avec succès'
            );
          }
        },
        error: error => {
          if (error.error) {
            this.toastService.showError(error.error, 'Une erreur est survenue');
          }
        },
      });
  }

  updateTeam(teamName: string, team: CreatedTeam) {
    if (teamName) {
      this.http
        .put<CreatedTeam>(`${environment.urlApi}/teams/${teamName}`, team)
        .subscribe({
          next: response => {
            if (response) {
              this.router.navigate([`/teams-details/${team.name}`]);
              this.toastService.showSuccess(
                'Votre équipe a été mise à jour',
                'Opération effectuée avec succès'
              );
            }
          },
          error: error => {
            if (error) {
              this.toastService.showError(
                error.error,
                'Une erreur est survenue'
              );
            }
          },
        });
    }
  }

  deleteTeam(teamName: string): void {
    this.http
      .delete<string>(`${environment.urlApi}/teams/${teamName}`)
      .subscribe({
        next: response => {
          if (response) {
            this.toastService.showSuccess(
              'Equipe supprimée avec succès',
              'Suppression'
            );
            this.router.navigate(['/profile']);
          }
        },
        error: error => {
          if (error.error) {
            this.toastService.showError(
              error.error,
              "Une erreur est survenue lors de la suppression de l'équipe"
            );
          }
        },
      });
  }
}
