import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CurrentProfile } from '../models/current-profile.model';
import { TeamMembers } from '../models/teamMembers.model';
import { environment } from '../../../environments/environment';
import { IProfileService } from './interfaces/IProfile.service';
import { CurrentUser } from 'src/app/auth/models/current-user.model';
import { TournamentCard } from 'src/app/tournament/models/tournament-card.model';
import { UserStatistics } from '../models/user-statistics.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService implements IProfileService {
  private currentProfiletDataUrl =
    '../assets/current-profile-details.model.json';

  private teamMembersDataUrl = '../assets/list-team-members.model.json';

  constructor(private http: HttpClient) {}

  getCurrentProfile(): Observable<CurrentProfile> {
    return this.http.get<CurrentProfile>(this.currentProfiletDataUrl);
  }

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

  getTeamMembers(): Observable<TeamMembers> {
    return this.http.get<TeamMembers>(this.teamMembersDataUrl);
  }

  updateProfile(userId: number, user: CurrentUser): Observable<CurrentUser> {
    return this.http.put<CurrentUser>(
      `${environment.urlApi}/users/${userId}`,
      user
    );
  }

  deleteProfile(userId: number): Observable<any> {
    return this.http.delete(`${environment.urlApi}/users/${userId}`);
  }
}
