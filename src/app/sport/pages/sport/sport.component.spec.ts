import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportComponent } from './sport.component';

describe('SportComponent', () => {
  let component: SportComponent;
  let fixture: ComponentFixture<SportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SportComponent]
    });
    fixture = TestBed.createComponent(SportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
