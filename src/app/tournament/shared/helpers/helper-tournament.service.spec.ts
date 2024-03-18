import { TestBed } from '@angular/core/testing';

import { HelperTournamentService } from './helper-tournament.service';

describe('HelperTournamentService', () => {
  let service: HelperTournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperTournamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
