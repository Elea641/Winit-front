import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { HttpClientModule } from '@angular/common/http';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
