import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TeamService } from './team.service';
import { Team } from '../models/team.model';
import { inject } from '@angular/core';
import { Member } from '../models/member.model';

export const memberResolver: ResolveFn<Member[] | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Member[] | null> => {
  const teamName: string | null = route.paramMap.get('teamName');
  if (teamName) {
    return inject(TeamService).getAllTeamsByUser();
  } else {
    return of(null);
  }
};
