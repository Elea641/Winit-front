import { Observable } from 'rxjs';

export interface IRankingService {
  getAllRanking(): Observable<any>;
}
