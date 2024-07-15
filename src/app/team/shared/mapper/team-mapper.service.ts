import { Injectable } from '@angular/core';
import { Team } from '../../models/team.type';
import { CreatedTeam } from '../../models/created-team.class';
import { ITeamMapperService } from '../interfaces/ITeamMapper.service';

@Injectable({
  providedIn: 'root',
})
export class TeamMapperService implements ITeamMapperService {
  mapToCreatedTeam(team: Team): CreatedTeam {
    return new CreatedTeam(team.name, team.sport, team.id);
  }
}
