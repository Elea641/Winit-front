import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, fromEvent, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetImageService {
  public baseUrl = environment.urlUploads;

  constructor(private http: HttpClient) {}

  getImage(url: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}${url}`, { responseType: 'blob' })
      .pipe(
        switchMap((blob: Blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          return fromEvent(reader, 'loadend').pipe(
            map(() => reader.result as string)
          );
        })
      );
  }
}
