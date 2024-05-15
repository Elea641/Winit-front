import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTeamsTournamentComponent } from './list-teams-tournament.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from 'src/app/shared/toast.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

describe('ListTeamsTournamentComponent', () => {
  let component: ListTeamsTournamentComponent;
  let fixture: ComponentFixture<ListTeamsTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ListTeamsTournamentComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '',
              },
            },
          },
        },
        ToastrService,
        ToastService,
      ],
    });
    fixture = TestBed.createComponent(ListTeamsTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
