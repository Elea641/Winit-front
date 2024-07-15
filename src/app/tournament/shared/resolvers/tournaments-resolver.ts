import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { TournamentService } from '../tournament.service';
import { TournamentCard } from '../../models/tournament-card.type';

export const tournamentsResolver: ResolveFn<TournamentCard[]> = (): Observable<
  TournamentCard[]
> => {
  return inject(TournamentService).getAllTournaments();
};
