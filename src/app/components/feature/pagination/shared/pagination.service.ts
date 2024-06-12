import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private apiUrl = `${environment.urlApi}/pagination/`;

  constructor(private http: HttpClient) {}

  getEntityPaginated(
    entityName: string,
    pageIndex: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get<any>(
      this.apiUrl +
        '?entityName=' +
        entityName +
        '&pageIndex=' +
        pageIndex +
        '&pageSize=' +
        pageSize
    );
  }
}
