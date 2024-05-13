import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUserEditComponent } from './back-office-user-edit.component';

describe('BackOfficeUserEditComponent', () => {
  let component: BackOfficeUserEditComponent;
  let fixture: ComponentFixture<BackOfficeUserEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeUserEditComponent]
    });
    fixture = TestBed.createComponent(BackOfficeUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
