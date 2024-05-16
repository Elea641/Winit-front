import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficePageComponent } from './back-office-page.component';

describe('BackOfficePageComponent', () => {
  let component: BackOfficePageComponent;
  let fixture: ComponentFixture<BackOfficePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackOfficePageComponent],
    });
    fixture = TestBed.createComponent(BackOfficePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
