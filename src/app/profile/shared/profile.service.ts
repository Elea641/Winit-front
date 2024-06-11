import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProfileService } from './interfaces/IProfile.service';
import { TournamentCard } from 'src/app/tournament/models/tournament-card.type';
import { UserStatistics } from '../models/user-statistics.model';
import { User } from 'src/app/auth/models/user.type';

@Injectable({
  providedIn: 'root',
})
export class ProfileService implements IProfileService {
  constructor(private http: HttpClient) {}

  getUserStatistics(): Observable<UserStatistics> {
    return this.http.get<UserStatistics>(
      `${environment.urlApi}/users/statistics`
    );
  }

  getListTournaments(): Observable<TournamentCard[]> {
    return this.http
      .get<TournamentCard[]>(`${environment.urlApi}/tournaments/user`)
      .pipe(map(tournaments => tournaments));
  }

  updateProfile(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${environment.urlApi}/users/${userId}`, user);
  }

  deleteProfile(userId: number): Observable<any> {
    return this.http.delete(`${environment.urlApi}/users/${userId}`);
  }
}
