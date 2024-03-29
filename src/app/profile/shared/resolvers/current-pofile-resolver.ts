import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ProfileService } from '../profile.service';
import { CurrentProfile } from '../../models/current-profile.model';

export const currentProfileResolver: ResolveFn<
  CurrentProfile
> = (): Observable<CurrentProfile> => {
  return inject(ProfileService).getCurrentProfile();
};
