import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.urlApi}/users/myself`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.urlApi}/users`);
  }
}
