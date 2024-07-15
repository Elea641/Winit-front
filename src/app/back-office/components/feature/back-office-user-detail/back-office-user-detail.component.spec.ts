import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUserDetailComponent } from './back-office-user-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('BackOfficeUserDetailComponent', () => {
  let component: BackOfficeUserDetailComponent;
  let fixture: ComponentFixture<BackOfficeUserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeUserDetailComponent, HttpClientModule],
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
      ],
    });
    fixture = TestBed.createComponent(BackOfficeUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
