import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatchUpdate } from '../models/matchUpdate.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private http: HttpClient) {}

  updateMatch(matchUpdate: MatchUpdate) {
    this.http
      .put<MatchUpdate>(
        `${environment.urlApi}/matches/${matchUpdate.id}`,
        matchUpdate
      )
      .subscribe({
        next: (response) => {
          if (response) {
            console.log(response);
          }
        },
        error: (error) => {
          if (error.error) {
          }
        },
      });
  }
}
