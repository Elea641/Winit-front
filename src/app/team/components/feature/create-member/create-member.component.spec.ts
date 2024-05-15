import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemberComponent } from './create-member.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateMemberComponent', () => {
  let component: CreateMemberComponent;
  let fixture: ComponentFixture<CreateMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CreateMemberComponent,
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
    fixture = TestBed.createComponent(CreateMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
