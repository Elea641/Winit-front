import { TestBed } from '@angular/core/testing';

import { TournamentListFilterService } from './tournament-list-filter.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';

describe('TournamentListFilterService', () => {
  let service: TournamentListFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ToastrModule.forRoot()],
      providers: [ToastService, ToastrService],
    });
    service = TestBed.inject(TournamentListFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
