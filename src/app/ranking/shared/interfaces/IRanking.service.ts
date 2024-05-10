import { Observable } from 'rxjs';
import { Ranking } from '../../models/ranking.model';

export interface IRankingService {
  getAllRanking(): Observable<Ranking>;
}
