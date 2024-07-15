import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { RankingService } from '../ranking.service';
import { Ranking } from '../../models/ranking.type';

export const rankingResolver: ResolveFn<
  Ranking | null
> = (): Observable<Ranking | null> => {
  return inject(RankingService).getAllRanking();
};
