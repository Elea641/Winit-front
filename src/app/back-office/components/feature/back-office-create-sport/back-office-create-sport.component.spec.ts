import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeCreateSportComponent } from './back-office-create-sport.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from '../../../../shared/toast.service';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BackOfficeCreateSportComponent', () => {
  let component: BackOfficeCreateSportComponent;
  let fixture: ComponentFixture<BackOfficeCreateSportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BackOfficeCreateSportComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        ToastService,
        ToastrService,
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
    fixture = TestBed.createComponent(BackOfficeCreateSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
