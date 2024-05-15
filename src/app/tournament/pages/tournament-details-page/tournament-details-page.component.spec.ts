import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDetailsPageComponent } from './tournament-details-page.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TournamentDetailsPageComponent', () => {
  let component: TournamentDetailsPageComponent;
  let fixture: ComponentFixture<TournamentDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TournamentDetailsPageComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
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
        ToastService,
        ToastrService,
      ],
    });
    fixture = TestBed.createComponent(TournamentDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
