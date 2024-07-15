import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTeamPageComponent } from './select-team-page.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';

describe('SelectTeamPageComponent', () => {
  let component: SelectTeamPageComponent;
  let fixture: ComponentFixture<SelectTeamPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SelectTeamPageComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
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
    fixture = TestBed.createComponent(SelectTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
