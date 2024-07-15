import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeSportEditComponent } from './back-office-sport-edit.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from '../../../../shared/toast.service';

describe('BackOfficeSportEditComponent', () => {
  let component: BackOfficeSportEditComponent;
  let fixture: ComponentFixture<BackOfficeSportEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BackOfficeSportEditComponent,
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
    fixture = TestBed.createComponent(BackOfficeSportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
