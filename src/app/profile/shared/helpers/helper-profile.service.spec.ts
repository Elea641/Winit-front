import { TestBed } from '@angular/core/testing';

import { HelperProfileService } from './helper-profile.service';

describe('HelperProfileService', () => {
  let service: HelperProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
