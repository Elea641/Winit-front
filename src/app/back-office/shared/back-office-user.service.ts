import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminUser } from '../models/admin-user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackOfficeUserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${environment.urlApi}/admin/users/`);
  }

  getUserById(id: number): Observable<AdminUser> {
    return this.http.get<AdminUser>(`${environment.urlApi}/admin/users/` + id);
  }

  createUser(user: AdminUser): Observable<object> {
    return this.http.post<AdminUser>(
      `${environment.urlApi}/admin/users/`,
      user
    );
  }

  editUser(id: number, user: AdminUser): Observable<AdminUser> {
    return this.http.put<AdminUser>(
      `${environment.urlApi}/admin/users/${id}`,
      user
    );
  }

  deleteUser(id: number): Observable<object> {
    return this.http.delete(`${environment.urlApi}/admin/users/${id}`);
  }
}
