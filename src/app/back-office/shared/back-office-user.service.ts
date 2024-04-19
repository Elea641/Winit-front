import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdminUser} from "../models/admin-user.model";
import {environment} from "../../../environments/environment";

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
}
