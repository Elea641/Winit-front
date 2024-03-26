import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../../models/team.model';

export const teamResolver: ResolveFn<
  Team | null
> = (): Observable<Team | null> => {
  // const teamName: string | null = inject(TeamService).getTeamByTeamName();
  // if (teamName) {
  //   return inject(TeamService).getTeamByTeamName(teamName);
  // } else {
  return of(null);
  // }
};
