import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfilePageComponent } from './update-profile-page.component';

describe('UpdateProfilePageComponent', () => {
  let component: UpdateProfilePageComponent;
  let fixture: ComponentFixture<UpdateProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateProfilePageComponent]
    });
    fixture = TestBed.createComponent(UpdateProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
