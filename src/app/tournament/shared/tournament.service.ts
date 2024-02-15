import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament.model';
import { Observable } from 'rxjs';
import { TournamentDetails } from '../models/tournament-details.model';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private tournamentDataUrl = '../assets/list-tournament.model.json';
  private apiUrl = 'http://localhost:8080/api/tournament/';
  private tournamentByIdDataUrl = '../assets/tournament-details.model.json';

  constructor(private http: HttpClient) {}

  getAllTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentDataUrl);
  }

  createTournament(tournament: Tournament): Observable<Tournament> {
    console.log(tournament);

    return this.http.post<Tournament>(`${this.apiUrl}/create`, tournament);
  }
  
  getTournamentById(): Observable<TournamentDetails> {
    return this.http.get<TournamentDetails>(this.tournamentByIdDataUrl);
  }
}
