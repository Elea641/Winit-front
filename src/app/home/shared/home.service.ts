import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TournamentCard } from 'src/app/tournament/models/tournament-card.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getAllTournaments(): Observable<TournamentCard[]> {
    return this.http.get<TournamentCard[]>(
      `${environment.urlApi}/tournaments/`
    );
  }

  getAllGeneratedTournaments(): Observable<TournamentCard[]> {
    return this.http.get<TournamentCard[]>(
      `${environment.urlApi}/tournaments/generated`
    );
  }

  getAllCUrrentTournaments(): Observable<TournamentCard[]> {
    return this.http.get<TournamentCard[]>(
      `${environment.urlApi}/tournaments/current`
    );
  }
}
