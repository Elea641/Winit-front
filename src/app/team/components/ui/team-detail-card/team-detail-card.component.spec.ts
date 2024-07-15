import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailCardComponent } from './team-detail-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';

describe('TeamDetailCardComponent', () => {
  let component: TeamDetailCardComponent;
  let fixture: ComponentFixture<TeamDetailCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TeamDetailCardComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
      providers: [ToastService, ToastrService],
    });
    fixture = TestBed.createComponent(TeamDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
