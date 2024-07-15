import { Observable } from 'rxjs';
import { Ranking } from '../../models/ranking.type';

export interface IRankingService {
  getAllRanking(): Observable<Ranking>;
}
