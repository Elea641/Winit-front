import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentProfile } from '../models/current-profile.model';
import { TeamMembers } from '../models/teamMembers.model';
import { User } from '../../auth/models/user.model';
import { environment } from '../../../environments/environment';
import { IProfileService } from './interfaces/IProfile.service';

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

  getTeamMembers(): Observable<TeamMembers> {
    return this.http.get<TeamMembers>(this.teamMembersDataUrl);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.urlApi}/users/myself`);
  }

  updateProfile(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${environment.urlApi}/users/${userId}`, user);
  }

  deleteProfile(userId: number): Observable<any> {
    return this.http.delete(`${environment.urlApi}/users/${userId}`);
  }
}
