import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentProfileDetailsComponent } from './current-profile-details.component';

describe('CurrentProfileDetailsComponent', () => {
  let component: CurrentProfileDetailsComponent;
  let fixture: ComponentFixture<CurrentProfileDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CurrentProfileDetailsComponent],
    });
    fixture = TestBed.createComponent(CurrentProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
