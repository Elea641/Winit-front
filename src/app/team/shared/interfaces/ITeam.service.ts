import { Observable } from 'rxjs';
import { Team } from '../../models/team.type';
import { CreatedTeam } from '../../models/created-team.class';

export interface ITeamService {
  getTeam(): Observable<Team | null>;

  setTeam(team: Team): void;

  getAllTeamsByUser(): Observable<Team[]>;

  getAllTeamsByUserForTournament(sport: string): Observable<Team[]>;

  getTeamByTeamName(teamName: string): Observable<Team>;

  addTeam(team: CreatedTeam): void;

  updateTeam(teamName: string, team: CreatedTeam): void;

  deleteTeam(teamName: string): void;
}
