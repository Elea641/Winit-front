import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeSportDeleteComponent } from './back-office-sport-delete.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../../../shared/toast.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('BackOfficeSportDeleteComponent', () => {
  let component: BackOfficeSportDeleteComponent;
  let fixture: ComponentFixture<BackOfficeSportDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BackOfficeSportDeleteComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        ToastService,
        ToastrService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(BackOfficeSportDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
