import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Roaster } from '../models/roaster.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoasterService {
  constructor(public http: HttpClient, private router: Router) {}

  addRoaster(roaster: Roaster): void {
    this.http
      .post<any>(`${environment.urlApi}/roasters/add`, roaster)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}
