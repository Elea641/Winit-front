import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdminSport } from '../models/admin-sport.model';

@Injectable({
  providedIn: 'root',
})
export class BackOfficeSportService {
  constructor(private http: HttpClient) {}

  getAllSports(): Observable<AdminSport[]> {
    return this.http.get<AdminSport[]>(`${environment.urlApi}/admin/sports/`);
  }

  getSportById(id: number): Observable<AdminSport> {
    return this.http.get<AdminSport>(
      `${environment.urlApi}/admin/sports/` + id
    );
  }

  createSport(sport: FormData): Observable<object> {
    return this.http.post<AdminSport>(
      `${environment.urlApi}/admin/sports/`,
      sport
    );
  }

  editSport(id: number, sport: FormData): Observable<object> {
    return this.http.put<FormData>(
      `${environment.urlApi}/admin/sports/${id}`,
      sport
    );
  }

  deleteSport(id: number): Observable<object> {
    return this.http.delete(`${environment.urlApi}/admin/sports/${id}`);
  }
}
