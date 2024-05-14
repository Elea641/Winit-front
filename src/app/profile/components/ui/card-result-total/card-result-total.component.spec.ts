import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResultTotalComponent } from './card-result-total.component';

describe('CardResultTotalComponent', () => {
  let component: CardResultTotalComponent;
  let fixture: ComponentFixture<CardResultTotalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardResultTotalComponent],
    });
    fixture = TestBed.createComponent(CardResultTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
