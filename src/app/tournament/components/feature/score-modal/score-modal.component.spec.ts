import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreModalComponent } from './score-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ScoreModalComponent', () => {
  let component: ScoreModalComponent;
  let fixture: ComponentFixture<ScoreModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ScoreModalComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            match: { scoreTeam1: 0, scoreTeam2: 0 },
            nextPhase: '',
            nextTeamInfo: {},
            tournamentId: 0,
          },
        },
        ToastService,
        ToastrService,
      ],
    });
    fixture = TestBed.createComponent(ScoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
