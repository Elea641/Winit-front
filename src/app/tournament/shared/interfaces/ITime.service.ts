import { Observable } from 'rxjs';

export interface ITimeService {
  setLimitInscription(limit: number): void;

  getLimitInscription(): Observable<number>;
}
