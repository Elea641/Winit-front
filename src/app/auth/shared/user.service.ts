import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser } from '../models/current-user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _BASE_URL = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  getOneUser(email: string): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${this._BASE_URL}/email/${email}`);
  }

  getAllUsers(): Observable<CurrentUser[]> {
    return this.http.get<CurrentUser[]>(`${this._BASE_URL}/all`);
  }
}
