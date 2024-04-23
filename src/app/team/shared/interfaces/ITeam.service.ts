import { Observable } from 'rxjs';
import { Team } from '../../models/team.model';
import { CreatedTeam } from '../../models/created-team.model';

export interface ITeamService {
  getTeam(): Observable<Team | null>;

  setTeam(team: Team): void;

  getAllTeamsByUser(): Observable<Team[]>;

  getAllTeamsByUserForTournament(sport: string): Observable<Team[]>;

  getTeamByTeamName(teamName: string): Observable<Team>;

  addTeam(team: CreatedTeam): void;

  updateTeam(team: CreatedTeam): void;

  deleteTeam(teamName: string): void;
}
