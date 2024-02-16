import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team.model';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/shared/toast.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private errorMessageSubject = new BehaviorSubject<string>('');

  constructor(
    public http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  getErrorMessage() {
    return this.errorMessageSubject.asObservable();
  }

  addTeam(team: Team): void {
    this.http.post<any>(`${environment.urlApi}/teams/add`, team).subscribe(
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
