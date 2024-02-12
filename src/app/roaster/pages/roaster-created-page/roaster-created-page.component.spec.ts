import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasterCreatedPageComponent } from './roaster-created-page.component';

describe('RoasterCreatedPageComponent', () => {
  let component: RoasterCreatedPageComponent;
  let fixture: ComponentFixture<RoasterCreatedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoasterCreatedPageComponent]
    });
    fixture = TestBed.createComponent(RoasterCreatedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
