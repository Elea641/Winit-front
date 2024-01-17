import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentProfile } from '../models/current-profile.model';
import { TeamMembers } from '../models/teamMembers.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
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
}
