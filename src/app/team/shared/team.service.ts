import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team.model';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/toast.service';
import { CreatedTeam } from '../models/created-team.model';
import { Member } from '../models/member.model';
import { TeamDetails } from '../models/team-details.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private selectedTeamSubject: BehaviorSubject<Team | null> =
    new BehaviorSubject<Team | null>(null);
  private isSelectedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private memberAddedSubject: Subject<void> = new Subject<void>();

  constructor(
    public http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private route: Router
  ) {}

  getAllTeamsByUser(): Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.urlApi}/teams`);
  }

  getTeamByTeamName(teamName: string): Observable<Team> {
    return this.http.get<Team>(`${environment.urlApi}/teams/${teamName}`);
  }

  getAllMembersByTeam(teamName: string): Observable<TeamDetails> {
    return this.http.get<TeamDetails>(
      `${environment.urlApi}/teams/${teamName}/members`
    );
  }

  getMemberAddedSubject(): Observable<void> {
    return this.memberAddedSubject.asObservable();
  }

  addTeam(team: CreatedTeam): void {
    this.http.post<any>(`${environment.urlApi}/teams`, team).subscribe(
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
        if (error.error === "Le nom de l'équipe est déjà pris") {
          this.toastService.showError(error.error, 'Une erreur est survenue');
        }
      }
    );
  }

  addMember(teamName: string, member: Member): void {
    this.http
      .post<any>(`${environment.urlApi}/teams/${teamName}/members`, member)
      .subscribe(
        (response) => {
          if (response) {
            this.memberAddedSubject.next();
            this.toastService.showSuccess(
              'Bravo félicitations',
              "Ajout de votre membre à l'équipe"
            );
          }
        },
        (error) => {
          if (error.error) {
            this.toastService.showError(error.error, 'Une erreur est survenue');
          }
        }
      );
  }

  deleteMemberByName(teamName: string, memberName: string): Observable<any> {
    return new Observable((observer) => {
      this.http
        .delete<any>(
          `${environment.urlApi}/teams/${teamName}/members/${memberName}`
        )
        .subscribe(
          (response) => {
            if (response) {
              this.toastService.showSuccess(
                'Membre supprimé avec succès',
                "Le membre a été supprimé de l'équipe"
              );

              this.getAllMembersByTeam(teamName).subscribe((members) => {
                observer.next(members);
                observer.complete();
              });
            }
          },
          (error) => {
            if (error.error) {
              this.toastService.showError(
                error.error,
                'Une erreur est survenue lors de la suppression du membre'
              );
            }
            observer.error(error);
          }
        );
    });
  }

  deleteTeamByName(teamName: string) {
    return this.http
      .delete<any>(`${environment.urlApi}/teams/${teamName}`)
      .subscribe(
        (response) => {
          if (response) {
            this.toastService.showSuccess(
              'Suppression',
              "L'équipe supprimé avec succès"
            );
            this.route.navigate(['/profile']);
          }
        },
        (error) => {
          if (error.error) {
            this.toastService.showError(
              error.error,
              'Une erreur est survenue lors de la suppression du membre'
            );
          }
        }
      );
  }

  setSelectTeam(team: Team): void {
    this.selectedTeamSubject.next(team);
    this.isSelectedSubject.next(true);
  }

  unselectTeam(): void {
    this.selectedTeamSubject.next(null);
    this.isSelectedSubject.next(false);
  }

  getSelectedTeam(): Observable<Team | null> {
    return this.selectedTeamSubject.asObservable();
  }

  getSelectedNameTeam(): string | null {
    const selectedTeam = this.selectedTeamSubject.getValue();
    return selectedTeam ? selectedTeam.name : null;
  }

  isSelectedTeam(): Observable<boolean> {
    return this.isSelectedSubject.asObservable();
  }
}
