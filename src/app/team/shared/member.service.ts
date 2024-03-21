import { Injectable } from '@angular/core';
import { TeamMember } from '../models/team-member.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/toast.service';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(public http: HttpClient, private toastService: ToastService) {}

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
}
