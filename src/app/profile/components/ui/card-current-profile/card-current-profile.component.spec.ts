import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCurrentProfileComponent } from './card-current-profile.component';

describe('CardCurrentProfileComponent', () => {
  let component: CardCurrentProfileComponent;
  let fixture: ComponentFixture<CardCurrentProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardCurrentProfileComponent],
    });
    fixture = TestBed.createComponent(CardCurrentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
