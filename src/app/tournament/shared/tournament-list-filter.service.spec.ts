import { TestBed } from '@angular/core/testing';

import { TournamentListFilterService } from './tournament-list-filter.service';

describe('TournamentListFilterService', () => {
  let service: TournamentListFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentListFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
