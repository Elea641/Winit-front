import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { Team } from 'src/app/team/models/team.model';
import { TeamService } from 'src/app/team/shared/team.service';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';

export const teamsForTournamentResolver: ResolveFn<Team[] | null> = (
  route: ActivatedRouteSnapshot
): Observable<Team[] | null> => {
  const teamService = inject(TeamService);
  const tournamentIdParam = route.paramMap.get('id');
  const tournamentId =
    tournamentIdParam !== null ? parseInt(tournamentIdParam, 10) : null;

  if (tournamentId) {
    const tournament =
      inject(TournamentService).getTournamentById(tournamentId);
    tournament.subscribe((tournament) => {
      teamService.getAllTeamsByUserForTournament(tournament?.sport);
    });
  }

  return of(null);
};
