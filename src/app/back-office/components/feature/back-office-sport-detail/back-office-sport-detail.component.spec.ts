import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeSportDetailComponent } from './back-office-sport-detail.component';

describe('BackOfficeSportDetailComponent', () => {
  let component: BackOfficeSportDetailComponent;
  let fixture: ComponentFixture<BackOfficeSportDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeSportDetailComponent]
    });
    fixture = TestBed.createComponent(BackOfficeSportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
