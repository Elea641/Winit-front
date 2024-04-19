import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUsersTableComponent } from './back-office-users-table.component';

describe('BackOfficeUsersTableComponent', () => {
  let component: BackOfficeUsersTableComponent;
  let fixture: ComponentFixture<BackOfficeUsersTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeUsersTableComponent]
    });
    fixture = TestBed.createComponent(BackOfficeUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
