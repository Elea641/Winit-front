import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTournamentMatchComponent } from './card-tournament-match.component';

describe('CardTournamentMatchComponent', () => {
  let component: CardTournamentMatchComponent;
  let fixture: ComponentFixture<CardTournamentMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardTournamentMatchComponent],
    });
    fixture = TestBed.createComponent(CardTournamentMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
