import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentProfile } from '../models/current-profile.model';
import { TeamMembers } from '../models/teamMembers.model';
import {User} from "../../auth/models/user.model";
import {environment} from "../../../environments/environment";
import {LocalStorageService} from "../../auth/shared/local-storage.service";

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private currentProfiletDataUrl =
    '../assets/current-profile-details.model.json';

  private teamMembersDataUrl = '../assets/list-team-members.model.json';

  constructor(
    private http: HttpClient,
    private lsService: LocalStorageService
  ) {}

  getCurrentProfile(): Observable<CurrentProfile> {
    return this.http.get<CurrentProfile>(this.currentProfiletDataUrl);
  }

  getTeamMembers(): Observable<TeamMembers> {
    return this.http.get<TeamMembers>(this.teamMembersDataUrl);
  }

  updateProfile(userId: number, user: User): Observable<User> {
    const token = this.lsService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
    const options = { headers: headers };

    return this.http.put<User>(`${environment.urlApi}/users/${userId}`, user, options);
  }
}
