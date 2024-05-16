import { TestBed } from '@angular/core/testing';

import { BackOfficeSportService } from './back-office-sport.service';
import { HttpClientModule } from '@angular/common/http';

describe('BackOfficeSportService', () => {
  let service: BackOfficeSportService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(BackOfficeSportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
