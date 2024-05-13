import { Observable } from 'rxjs';
import { CreatedTeam } from '../../models/created-team.model';
import { Team } from '../../models/team.model';

export interface ITeamMapperService {
  mapToCreatedTeam(team: Team): CreatedTeam;
}
