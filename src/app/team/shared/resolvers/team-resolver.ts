import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../../models/team.type';

export const teamResolver: ResolveFn<Team | null> = (
  route: ActivatedRouteSnapshot
): Observable<Team | null> => {
  const teamName: string | null = route.paramMap.get('teamName');
  if (teamName) {
    return inject(TeamService).getTeamByTeamName(teamName);
  } else {
    return of(null);
  }
};
