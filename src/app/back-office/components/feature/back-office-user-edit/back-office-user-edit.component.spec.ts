import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUserEditComponent } from './back-office-user-edit.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from '../../../../shared/toast.service';

describe('BackOfficeUserEditComponent', () => {
  let component: BackOfficeUserEditComponent;
  let fixture: ComponentFixture<BackOfficeUserEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BackOfficeUserEditComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
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
    fixture = TestBed.createComponent(BackOfficeUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
