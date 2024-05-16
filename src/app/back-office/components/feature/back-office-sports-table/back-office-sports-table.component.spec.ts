import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeSportsTableComponent } from './back-office-sports-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BackOfficeSportsTableComponent', () => {
  let component: BackOfficeSportsTableComponent;
  let fixture: ComponentFixture<BackOfficeSportsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BackOfficeSportsTableComponent,
        HttpClientModule,
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
      ],
    });
    fixture = TestBed.createComponent(BackOfficeSportsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
