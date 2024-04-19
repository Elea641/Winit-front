import { TestBed } from '@angular/core/testing';

import { BackOfficeUserService } from './back-office-user.service';

describe('BackOfficeUserService', () => {
  let service: BackOfficeUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackOfficeUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
