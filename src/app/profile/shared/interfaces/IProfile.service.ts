import { Observable } from 'rxjs';
import { UserStatistics } from '../../models/user-statistics.model';
import { User } from 'src/app/auth/models/user.type';

export interface IProfileService {
  getUserStatistics(): Observable<UserStatistics>;

  updateProfile(userId: number, user: User): Observable<User>;

  deleteProfile(userId: number): Observable<any>;
}
