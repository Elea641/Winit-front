import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionFormTournamentComponent } from './inscription-form-tournament.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('InscriptionFormTournamentComponent', () => {
  let component: InscriptionFormTournamentComponent;
  let fixture: ComponentFixture<InscriptionFormTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        InscriptionFormTournamentComponent,
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
    fixture = TestBed.createComponent(InscriptionFormTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
