import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/toast.service';
import { Member } from '../models/member.model';
import { IMemberService } from './interfaces/IMember.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService implements IMemberService {
  private memberSubject: Subject<Member | null> = new Subject<Member | null>();
  public member$: Observable<Member | null> = this.memberSubject.asObservable();

  constructor(public http: HttpClient, private toastService: ToastService) {}

  addMember(teamName: string, member: Member): void {
    this.http
      .post<any>(`${environment.urlApi}/members/${teamName}`, member)
      .subscribe(
        (response) => {
          if (response) {
            this.toastService.showSuccess(
              'Bravo félicitations',
              "Ajout de votre membre à l'équipe"
            );
            this.memberSubject.next(member);
          }
        },
        (error) => {
          if (error.error) {
            this.toastService.showError(error.error, 'Une erreur est survenue');
          }
        }
      );
  }

  deleteMemberByTeamName(teamName: string, member: Member): void {
    const memberId = member.id;
    this.http
      .delete<any>(`${environment.urlApi}/members/${teamName}/${memberId}`)
      .subscribe(
        (response) => {
          if (response) {
            this.toastService.showSuccess(
              'Membre supprimé avec succès',
              "Le membre a été supprimé de l'équipe"
            );
            this.memberSubject.next(null);
          }
        },
        (error) => {
          if (error.error) {
            this.toastService.showError(error.error, 'Une erreur est survenue');
          }
        }
      );
  }
}
