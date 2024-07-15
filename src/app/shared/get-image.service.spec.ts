import { TestBed } from '@angular/core/testing';

import { GetImageService } from './get-image.service';
import { HttpClientModule } from '@angular/common/http';

describe('GetImageService', () => {
  let service: GetImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(GetImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
