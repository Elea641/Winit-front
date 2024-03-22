import { Injectable } from '@angular/core';
import { TeamMember } from '../models/team-member.model';
import { BehaviorSubject, Observable, catchError, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/toast.service';
import { Member } from '../models/member.model';
import { TeamService } from './team.service';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private membersSubject: BehaviorSubject<Member | null> =
    new BehaviorSubject<Member | null>(null);
  public member$: Observable<Member | null> =
    this.membersSubject.asObservable();
  private teamMembersCountSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public teamMembersCount$: Observable<number> =
    this.teamMembersCountSubject.asObservable();
  private team!: Team;

  constructor(
    public http: HttpClient,
    private toastService: ToastService,
    private teamService: TeamService
  ) {}

  getAllMembersByTeam(teamName: string): Observable<TeamMember> {
    return this.http.get<TeamMember>(
      `${environment.urlApi}/teams/${teamName}/members`
    );
  }

  addMember(teamName: string, member: Member): void {
    this.http
      .post<any>(`${environment.urlApi}/teams/${teamName}/members`, member)
      .subscribe(
        (response) => {
          if (response) {
            this.toastService.showSuccess(
              'Bravo félicitations',
              "Ajout de votre membre à l'équipe"
            );
            this.membersSubject.next(member);
            this.teamMembersCountSubject.next(1);
          }
        },
        (error) => {
          if (error.error) {
            this.toastService.showError(error.error, 'Une erreur est survenue');
          }
        }
      );
  }

  deleteMemberByName(
    teamName: string,
    memberName: string
  ): Observable<TeamMember> {
    return this.http
      .delete<any>(
        `${environment.urlApi}/teams/${teamName}/members/${memberName}`
      )
      .pipe(
        switchMap(() => this.getAllMembersByTeam(teamName)),
        tap(() => {
          this.toastService.showSuccess(
            'Membre supprimé avec succès',
            "Le membre a été supprimé de l'équipe"
          );
          this.teamMembersCountSubject.next(-1);
        }),
        catchError((error) => {
          this.toastService.showError(
            error.error,
            'Une erreur est survenue lors de la suppression du membre'
          );
          throw error;
        })
      );
  }
}
