import { Observable, Subscription } from 'rxjs';
import { Team } from '../../models/team.model';
import { CreatedTeam } from '../../models/created-team.model';

export interface ITeamService {
  getAllTeamsByUser(): Observable<Team[]>;

  getTeamByTeamName(teamName: string): Observable<Team>;

  addTeam(team: CreatedTeam): void;

  deleteTeam(teamName: string): Subscription;
}
