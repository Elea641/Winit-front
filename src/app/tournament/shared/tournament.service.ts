import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private tournamentDataUrl = '../assets/list-tournament.model.json';
  private apiUrl = 'http://localhost:8080/api/tournament/';

  constructor(private http: HttpClient) {}

  getAllTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentDataUrl);
  }

  createTournament(tournament: Tournament): Observable<Tournament> {
    console.log(tournament);

    return this.http.post<Tournament>(`${this.apiUrl}/create`, tournament);
  }
}
