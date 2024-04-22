import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team.model';
import { Observable, Subject, of } from 'rxjs';
import { ToastService } from 'src/app/shared/toast.service';
import { CreatedTeam } from '../models/created-team.model';
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
    return this.http.get<Team[]>(`${environment.urlApi}/teams`);
  }

  getAllTeamsByUserForTournament(sport: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.urlApi}/teams/sport/${sport}`);
  }

  getTeamByTeamName(teamName: string): Observable<Team> {
    return this.http.get<Team>(`${environment.urlApi}/teams/${teamName}`);
  }

  addTeam(team: CreatedTeam): void {
    this.http.post<CreatedTeam>(`${environment.urlApi}/teams`, team).subscribe(
      (response) => {
        if (response) {
          this.router.navigate([`/teams-details/${team.name}`]);
          this.toastService.showSuccess(
            'Bravo félicitations',
            'Création de votre équipe'
          );
        }
      },
      (error) => {
        if (error.error === "Erreur : Le nom de l'équipe est déjà pris.") {
          this.toastService.showError(error.error, 'Une erreur est survenue');
        }
      }
    );
  }

  updateTeam(team: CreatedTeam) {
    this.team$.subscribe((currentTeam) => {
      if (currentTeam) {
        this.http
          .put<CreatedTeam>(
            `${environment.urlApi}/teams/${currentTeam.name}`,
            team
          )
          .subscribe(
            (response) => {
              if (response) {
                this.router.navigate([`/teams-details/${team.name}`]);
                this.toastService.showSuccess(
                  'Bravo félicitations',
                  'Mise à jour de votre équipe'
                );
              }
            },
            (error) => {
              if (error.error) {
                this.toastService.showError(
                  error.error,
                  'Une erreur est survenue'
                );
              }
            }
          );
      }
    });
  }

  deleteTeam(teamName: string): void {
    this.http.delete<any>(`${environment.urlApi}/teams/${teamName}`).subscribe(
      (response) => {
        if (response) {
          this.toastService.showSuccess(
            'Suppression',
            "L'équipe supprimé avec succès"
          );
          this.router.navigate(['/profile']);
        }
      },
      (error) => {
        if (error.error) {
          this.toastService.showError(
            error.error,
            "Une erreur est survenue lors de la suppression de l'équipe"
          );
        }
      }
    );
  }
}
