import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament.model';
import { Observable } from 'rxjs';
import { TournamentDetails } from '../models/tournament-details.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private tournamentDataUrl = '../assets/list-tournament.model.json';
  private apiUrl = `${environment.urlApi}` + "/tournaments";
  private tournamentByIdDataUrl = '../assets/tournament-details.model.json';

  constructor(private http: HttpClient) {}

  getAllTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentDataUrl);
  }

  createTournament(tournament: Tournament): Observable<Tournament> {
    console.log(tournament);

    return this.http.post<Tournament>(`${this.apiUrl}`, tournament);
  }
  
  getTournamentById(): Observable<TournamentDetails> {
    return this.http.get<TournamentDetails>(this.tournamentByIdDataUrl);
  }
}
