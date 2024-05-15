import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeSportEditComponent } from './back-office-sport-edit.component';

describe('BackOfficeSportEditComponent', () => {
  let component: BackOfficeSportEditComponent;
  let fixture: ComponentFixture<BackOfficeSportEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeSportEditComponent]
    });
    fixture = TestBed.createComponent(BackOfficeSportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
