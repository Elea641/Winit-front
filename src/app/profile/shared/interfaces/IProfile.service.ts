import { Observable } from "rxjs";
import { CurrentProfile } from "../../models/current-profile.model";
import { TeamMembers } from "../../models/teamMembers.model";
import { User } from "src/app/auth/models/user.model";

export interface IProfileService {
    getCurrentProfile(): Observable<CurrentProfile>
    
      getTeamMembers(): Observable<TeamMembers>
    
      getCurrentUser(): Observable<User>
    
      updateProfile(userId: number, user: User): Observable<User>
    
      deleteProfile(userId: number): Observable<any>
}
