import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUserDeleteComponent } from './back-office-user-delete.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from '../../../../shared/toast.service';
import { ActivatedRoute } from '@angular/router';

describe('BackOfficeUserDeleteComponent', () => {
  let component: BackOfficeUserDeleteComponent;
  let fixture: ComponentFixture<BackOfficeUserDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BackOfficeUserDeleteComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        ToastService,
        ToastrService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
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
      ],
    });
    fixture = TestBed.createComponent(BackOfficeUserDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
