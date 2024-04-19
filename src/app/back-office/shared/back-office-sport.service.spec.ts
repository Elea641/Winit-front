import { TestBed } from '@angular/core/testing';

import { BackOfficeSportService } from './back-office-sport.service';

describe('BackOfficeSportService', () => {
  let service: BackOfficeSportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackOfficeSportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
