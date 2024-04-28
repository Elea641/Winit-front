import { Injectable } from '@angular/core';
import { Team } from '../../models/team.model';
import { CreatedTeam } from '../../models/created-team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamMapperService {
  mapToCreatedTeam(team: Team): CreatedTeam {
    return new CreatedTeam(team.name, team.sport, team.id);
  }
}
