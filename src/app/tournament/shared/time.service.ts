import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private limitTimeInscriptionSubject: Subject<number> = new Subject<number>();
  public limitTimeInscription$: Observable<number> =
    this.limitTimeInscriptionSubject.asObservable();

  setLimitInscription(limit: number) {
    this.limitTimeInscriptionSubject.next(limit);
  }

  getLimitInscription(): Observable<number> {
    return this.limitTimeInscription$;
  }
}
