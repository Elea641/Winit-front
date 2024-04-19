import { Observable } from 'rxjs';
import { CurrentProfile } from '../../models/current-profile.model';
import { TeamMembers } from '../../models/teamMembers.model';
import { CurrentUser } from 'src/app/auth/models/current-user.model';

export interface IProfileService {
  getCurrentProfile(): Observable<CurrentProfile>;

  getTeamMembers(): Observable<TeamMembers>;

  updateProfile(userId: number, user: CurrentUser): Observable<CurrentUser>;

  deleteProfile(userId: number): Observable<any>;
}
