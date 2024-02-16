import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastService } from 'src/app/shared/toast.service';
import { CreatedTeam } from '../models/created-team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private selectedTeamSubject: BehaviorSubject<Team | null> =
    new BehaviorSubject<Team | null>(null);
  private isSelectedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    public http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  getAllTeamsByUser(): Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.urlApi}/teams`);
  }

  addTeam(team: CreatedTeam): void {
    this.http.post<any>(`${environment.urlApi}/teams`, team).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/']);
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

  isSelectedTeam(): Observable<boolean> {
    return this.isSelectedSubject.asObservable();
  }
}
