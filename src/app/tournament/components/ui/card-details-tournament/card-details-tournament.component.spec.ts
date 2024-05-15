import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsTournamentComponent } from './card-details-tournament.component';

describe('CardDetailsTournamentComponent', () => {
  let component: CardDetailsTournamentComponent;
  let fixture: ComponentFixture<CardDetailsTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardDetailsTournamentComponent],
    });
    fixture = TestBed.createComponent(CardDetailsTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
