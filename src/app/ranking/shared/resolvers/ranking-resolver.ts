import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { RankingService } from '../ranking.service';

export const rankingResolver: ResolveFn<any | null> = (): Observable<
  any | null
> => {
  return inject(RankingService).getAllRanking();
};
