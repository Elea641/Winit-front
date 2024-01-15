import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentProfile } from '../models/current-profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private currentProfiletDataUrl =
    '../assets/current-profile-details.model.json';

  constructor(private http: HttpClient) {}

  getCurrentProfile(): Observable<CurrentProfile> {
    return this.http.get<CurrentProfile>(this.currentProfiletDataUrl);
  }
}
