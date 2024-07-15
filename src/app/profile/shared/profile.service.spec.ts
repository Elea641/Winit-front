import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { UserStatistics } from '../models/user-statistics.model';

describe('ProfileService', () => {
  let service: ProfileService;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProfileService', [
      'getCurrentProfile',
      'getUserStatistics',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: ProfileService, useValue: spy }],
    });
    service = TestBed.inject(ProfileService);
    profileServiceSpy = TestBed.inject(
      ProfileService
    ) as jasmine.SpyObj<ProfileService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get statistics', () => {
    const mockStatistics: UserStatistics = {
      firstPlace: 5,
      secondPlace: 3,
      thirdPlace: 2,
      participation: 10,
      podium: 10,
      lastTournaments: [],
      nextTournaments: [],
    };

    profileServiceSpy.getUserStatistics.and.returnValue(of(mockStatistics));

    profileServiceSpy.getUserStatistics().subscribe(statistics => {
      expect(statistics).toEqual(mockStatistics);
    });

    expect(profileServiceSpy.getUserStatistics.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });
});
