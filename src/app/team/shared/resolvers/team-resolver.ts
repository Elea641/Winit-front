import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../../models/team.model';

export const teamResolver: ResolveFn<Team | null> = (
  route: ActivatedRouteSnapshot
): Observable<Team | null> => {
  const teamName: string | null = route.paramMap.get('teamName');
  const teamService = inject(TeamService);
  if (teamName) {
    const team = inject(TeamService).getTeamByTeamName(teamName);
    team.subscribe((team) => (teamService.currentTeam = team));
    return team;
  } else {
    return of(null);
  }
};
