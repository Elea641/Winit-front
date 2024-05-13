import { TestBed } from '@angular/core/testing';

import { TeamMapperService } from './team-mapper.service';

describe('TeamMapperService', () => {
  let service: TeamMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
