import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserStatistics } from '../../models/user-statistics.model';

export const userStatisticsResolver: ResolveFn<
  UserStatistics
> = (): Observable<UserStatistics> => {
  return inject(ProfileService).getUserStatistics();
};
