import { CreatedTeam } from '../../models/created-team.class';
import { Team } from '../../models/team.type';

export interface ITeamMapperService {
  mapToCreatedTeam(team: Team): CreatedTeam;
}
