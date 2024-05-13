import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITimeService } from './interfaces/ITime.service';

@Injectable({
  providedIn: 'root',
})
export class TimeService implements ITimeService {
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
