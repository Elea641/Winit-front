import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeCreateSportComponent } from './back-office-create-sport.component';

describe('BackOfficeCreateSportComponent', () => {
  let component: BackOfficeCreateSportComponent;
  let fixture: ComponentFixture<BackOfficeCreateSportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeCreateSportComponent]
    });
    fixture = TestBed.createComponent(BackOfficeCreateSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
