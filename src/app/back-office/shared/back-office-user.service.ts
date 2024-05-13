import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdminUser} from "../models/admin-user.model";
import {environment} from "../../../environments/environment";
import {User} from "../../auth/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class BackOfficeUserService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${environment.urlApi}/admin/users/`)
  }

  getUserById(id: number): Observable<AdminUser> {
    return this.http.get<AdminUser>(`${environment.urlApi}/admin/users/` + id)
  }

  editUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${environment.urlApi}/admin/users/${id}`, user)
  }
}
