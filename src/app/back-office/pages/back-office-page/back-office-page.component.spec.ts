import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficePageComponent } from './back-office-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BackOfficePageComponent', () => {
  let component: BackOfficePageComponent;
  let fixture: ComponentFixture<BackOfficePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BackOfficePageComponent,
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
    fixture = TestBed.createComponent(BackOfficePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
