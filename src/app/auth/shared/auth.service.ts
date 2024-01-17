import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  private url = 'https://localhost:8080';

  postRegister(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/api/auth/register`, user);
  }
}
