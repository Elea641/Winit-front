import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TeamService } from '../team.service';
import { inject } from '@angular/core';
import { Member } from '../../models/member.model';

export const memberResolver: ResolveFn<Member[] | null> = (): Observable<
  Member[] | null
> => {
  const teamName: string | null = inject(TeamService).getSelectedNameTeam();

  if (teamName) {
    return inject(TeamService).getAllMembersByTeam(teamName);
  } else {
    return of(null);
  }
};
