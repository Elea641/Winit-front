import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { inject } from '@angular/core';
import { Team } from 'src/app/team/models/team.model';
import { TeamService } from 'src/app/team/shared/team.service';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';

export const teamsForTournamentResolver: ResolveFn<Team[] | null> = (
  route: ActivatedRouteSnapshot
): Observable<Team[] | null> => {
  let sport = '';
  const tournamentIdParam = route.paramMap.get('id');
  const tournamentId =
    tournamentIdParam !== null ? parseInt(tournamentIdParam, 10) : null;

  console.log('tournamentId:', tournamentId);
  if (tournamentId) {
    const tournament =
      inject(TournamentService).getTournamentById(tournamentId);
    tournament.subscribe((tournament) => {
      sport = tournament?.sport ?? '';
    });

    return inject(TeamService).getAllTeamsByUserForTournament(sport);
  }

  return of(null);
};
