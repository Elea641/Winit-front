import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResultTournamentComponent } from './card-result-tournament.component';

describe('CardResultTournamentComponent', () => {
  let component: CardResultTournamentComponent;
  let fixture: ComponentFixture<CardResultTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardResultTournamentComponent],
    });
    fixture = TestBed.createComponent(CardResultTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
