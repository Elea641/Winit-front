import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUserDetailComponent } from './back-office-user-detail.component';

describe('BackOfficeUserDetailComponent', () => {
  let component: BackOfficeUserDetailComponent;
  let fixture: ComponentFixture<BackOfficeUserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeUserDetailComponent]
    });
    fixture = TestBed.createComponent(BackOfficeUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
