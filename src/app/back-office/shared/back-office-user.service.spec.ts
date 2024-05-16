import { TestBed } from '@angular/core/testing';

import { BackOfficeUserService } from './back-office-user.service';
import { HttpClientModule } from '@angular/common/http';

describe('BackOfficeUserService', () => {
  let service: BackOfficeUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });

    service = TestBed.inject(BackOfficeUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
