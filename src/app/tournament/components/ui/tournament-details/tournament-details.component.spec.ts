import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsTournamentComponent } from './tournament-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CardDetailsTournamentComponent', () => {
  let component: CardDetailsTournamentComponent;
  let fixture: ComponentFixture<CardDetailsTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CardDetailsTournamentComponent,
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
    fixture = TestBed.createComponent(CardDetailsTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
