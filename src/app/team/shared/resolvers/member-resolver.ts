import {
  ActivatedRouteSnapshot,
  Params,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TeamService } from '../team.service';
import { inject } from '@angular/core';
import { Member } from '../../models/member.model';

export const memberResolver: ResolveFn<Member[] | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Member[] | null> => {
  const params: Params | undefined = route.parent?.params;

  if (params) {
    return inject(TeamService).getAllMembersByTeam(params['teamName']);
  } else {
    return of(null);
  }
};
