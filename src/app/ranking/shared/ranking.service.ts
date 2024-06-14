import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRankingService } from './interfaces/IRanking.service';
import { Ranking } from '../models/ranking.type';

@Injectable({
  providedIn: 'root',
})
export class RankingService implements IRankingService {
  constructor(private http: HttpClient) {}

  getAllRanking(): Observable<Ranking> {
    return this.http.get<Ranking>(`${environment.urlApi}/matches/`);
  }
}
