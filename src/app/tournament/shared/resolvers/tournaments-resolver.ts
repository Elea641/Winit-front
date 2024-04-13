import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { TournamentService } from '../tournament.service';
import { TournamentCard } from '../../models/tournament-card.model';

export const tournamentsResolver: ResolveFn<TournamentCard[]> = (
  route: ActivatedRouteSnapshot
): Observable<TournamentCard[]> => {
  return inject(TournamentService).getAllTournaments();
};
