import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(public http: HttpClient, private router: Router) {}

  addTeam(team: Team): void {
    this.http
      .post<any>(`${environment.urlApi}/teams/add`, team)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}
