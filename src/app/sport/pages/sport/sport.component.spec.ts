import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportComponent } from './sport.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SportComponent', () => {
  let component: SportComponent;
  let fixture: ComponentFixture<SportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SportComponent, HttpClientModule, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(SportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
