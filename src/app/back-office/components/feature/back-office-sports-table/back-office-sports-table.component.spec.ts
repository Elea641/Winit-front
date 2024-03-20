import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeSportsTableComponent } from './back-office-sports-table.component';

describe('BackOfficeSportsTableComponent', () => {
  let component: BackOfficeSportsTableComponent;
  let fixture: ComponentFixture<BackOfficeSportsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeSportsTableComponent]
    });
    fixture = TestBed.createComponent(BackOfficeSportsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
