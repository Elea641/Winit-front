import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastService} from "../../shared/toast.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AdminSport} from "../models/admin-sport.model";

@Injectable({
  providedIn: 'root'
})
export class BackOfficeSportService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllSports(): Observable<AdminSport[]> {
    return this.http.get<AdminSport[]>(`${environment.urlApi}/admin/sports/`);
  }

  getSportById(id: number): Observable<AdminSport> {
    return this.http.get<AdminSport>(`${environment.urlApi}/admin/sports/` + id);
  }
}
