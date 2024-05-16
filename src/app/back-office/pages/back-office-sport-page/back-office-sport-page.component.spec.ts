import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeSportPageComponent } from './back-office-sport-page.component';

describe('BackOfficeSportPageComponent', () => {
  let component: BackOfficeSportPageComponent;
  let fixture: ComponentFixture<BackOfficeSportPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeSportPageComponent],
    });
    fixture = TestBed.createComponent(BackOfficeSportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
