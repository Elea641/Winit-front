import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportDetailComponent } from './sport-detail.component';
import { HttpClientModule } from '@angular/common/http';

describe('SportDetailComponent', () => {
  let component: SportDetailComponent;
  let fixture: ComponentFixture<SportDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SportDetailComponent, HttpClientModule],
    });
    fixture = TestBed.createComponent(SportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
