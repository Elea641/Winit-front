import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportListComponent } from './sport-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('SportListComponent', () => {
  let component: SportListComponent;
  let fixture: ComponentFixture<SportListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SportListComponent, HttpClientModule],
    });
    fixture = TestBed.createComponent(SportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
