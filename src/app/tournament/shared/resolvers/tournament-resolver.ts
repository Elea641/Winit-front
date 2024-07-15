import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { TournamentService } from '../tournament.service';
import { TournamentDetails } from '../../models/tournament-details.type';

export const tournamentResolver: ResolveFn<TournamentDetails | null> = (
  route: ActivatedRouteSnapshot
): Observable<TournamentDetails | null> => {
  return inject(TournamentService).getTournamentById(
    Number(route.paramMap.get('id'))
  );
};
