import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeSportDeleteComponent } from './back-office-sport-delete.component';

describe('BackOfficeSportDeleteComponent', () => {
  let component: BackOfficeSportDeleteComponent;
  let fixture: ComponentFixture<BackOfficeSportDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeSportDeleteComponent]
    });
    fixture = TestBed.createComponent(BackOfficeSportDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
