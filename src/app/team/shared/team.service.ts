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
}
