import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUserPageComponent } from './back-office-user-page.component';

describe('BackOfficeUserPageComponent', () => {
  let component: BackOfficeUserPageComponent;
  let fixture: ComponentFixture<BackOfficeUserPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficeUserPageComponent],
    });
    fixture = TestBed.createComponent(BackOfficeUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
