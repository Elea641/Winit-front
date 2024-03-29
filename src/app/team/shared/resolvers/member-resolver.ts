import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { TeamMember } from '../../models/team-member.model';
import { TeamService } from '../team.service';
import { MemberService } from '../member.service';

export const memberResolver: ResolveFn<
  TeamMember | null
> = (): Observable<TeamMember | null> => {
  const teamName: string | null = inject(TeamService).getSelectedNameTeam();

  if (teamName) {
    return inject(MemberService).getAllMembersByTeam(teamName);
  } else {
    return of(null);
  }
};
