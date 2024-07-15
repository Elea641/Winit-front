import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamPageComponent } from './create-team-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from 'src/app/shared/toast.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateTeamPageComponent', () => {
  let component: CreateTeamPageComponent;
  let fixture: ComponentFixture<CreateTeamPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CreateTeamPageComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        ToastrService,
        ToastService,
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
    fixture = TestBed.createComponent(CreateTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
