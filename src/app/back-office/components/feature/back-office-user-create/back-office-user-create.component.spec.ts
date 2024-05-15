import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUserCreateComponent } from './back-office-user-create.component';

describe('BackOfficeUserCreateComponent', () => {
  let component: BackOfficeUserCreateComponent;
  let fixture: ComponentFixture<BackOfficeUserCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeUserCreateComponent]
    });
    fixture = TestBed.createComponent(BackOfficeUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
