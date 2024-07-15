import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sport } from '../models/sport.type';

@Injectable({
  providedIn: 'root',
})
export class SportService {
  constructor(private http: HttpClient) {}

  getAllSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(`${environment.urlApi}/sports/`);
  }

  getAllSportsNames(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.urlApi}/sports/names`);
  }
}
