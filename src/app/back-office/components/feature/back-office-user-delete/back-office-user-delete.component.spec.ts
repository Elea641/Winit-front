import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUserDeleteComponent } from './back-office-user-delete.component';

describe('BackOfficeUserDeleteComponent', () => {
  let component: BackOfficeUserDeleteComponent;
  let fixture: ComponentFixture<BackOfficeUserDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeUserDeleteComponent]
    });
    fixture = TestBed.createComponent(BackOfficeUserDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
