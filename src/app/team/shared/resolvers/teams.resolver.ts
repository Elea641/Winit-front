import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Team } from 'src/app/team/models/team.type';
import { TeamService } from 'src/app/team/shared/team.service';

export const teamsResolver: ResolveFn<Team[] | null> = (): Observable<
  Team[] | null
> => {
  return inject(TeamService).getAllTeamsByUser();
};
