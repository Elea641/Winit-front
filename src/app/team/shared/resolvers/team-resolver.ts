import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TeamService } from '../team.service';
import { Team } from '../../models/team.model';
import { inject } from '@angular/core';

export const teamResolver: ResolveFn<Team | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Team | null> => {
  const teamName: string | null = route.paramMap.get('teamName');
  if (teamName) {
    return inject(TeamService).getTeamByTeamName(teamName);
  } else {
    return of(null);
  }
};
