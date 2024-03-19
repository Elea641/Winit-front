import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser } from '../models/current-user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getOneUser(email: string): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(
      `${environment.urlApi}/users/email/${email}`
    );
  }

  getAllUsers(): Observable<CurrentUser[]> {
    return this.http.get<CurrentUser[]>(`${environment.urlApi}/users/all`);
  }
}
