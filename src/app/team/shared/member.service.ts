import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/toast.service';
import { Member } from '../models/member.type';
import { IMemberService } from './interfaces/IMember.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService implements IMemberService {
  private memberSubject: Subject<Member | null> = new Subject<Member | null>();
  public member$: Observable<Member | null> = this.memberSubject.asObservable();

  constructor(
    public http: HttpClient,
    private toastService: ToastService
  ) {}

  addMember(teamName: string, member: object): void {
    this.http
      .post<Member>(`${environment.urlApi}/members/${teamName}`, member)
      .subscribe({
        next: response => {
          if (response) {
            this.toastService.showSuccess(
              "Le membre a été ajouté à l'équipe",
              'Opération effectuée avec succès'
            );
            this.memberSubject.next(response);
          }
        },
        error: error => {
          if (error.error) {
            this.toastService.showError(error.error, 'Une erreur est survenue');
          }
        },
      });
  }

  deleteMemberByTeamName(teamName: string, member: Member): void {
    const memberId = member.id;
    this.http
      .delete<Member>(`${environment.urlApi}/members/${teamName}/${memberId}`)
      .subscribe({
        next: response => {
          if (response) {
            this.toastService.showSuccess(
              "Le membre a été supprimé de l'équipe",
              'Membre supprimé avec succès'
            );
            this.memberSubject.next(null);
          }
        },
        error: error => {
          if (error.error) {
            this.toastService.showError(error.error, 'Une erreur est survenue');
          }
        },
      });
  }
}
