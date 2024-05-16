import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeSportDetailComponent } from './back-office-sport-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('BackOfficeSportDetailComponent', () => {
  let component: BackOfficeSportDetailComponent;
  let fixture: ComponentFixture<BackOfficeSportDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeSportDetailComponent, HttpClientModule],
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
    fixture = TestBed.createComponent(BackOfficeSportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
