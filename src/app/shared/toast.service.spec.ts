import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [ToastrService],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
