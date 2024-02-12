import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasterPageComponent } from './roaster-page.component';

describe('RoasterPageComponent', () => {
  let component: RoasterPageComponent;
  let fixture: ComponentFixture<RoasterPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoasterPageComponent]
    });
    fixture = TestBed.createComponent(RoasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
