import { TestBed } from '@angular/core/testing';

import { SportService } from './sport.service';
import { HttpClientModule } from '@angular/common/http';

describe('SportService', () => {
  let service: SportService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(SportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
