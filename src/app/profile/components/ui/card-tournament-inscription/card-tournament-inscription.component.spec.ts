import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTournamentInscriptionComponent } from './card-tournament-inscription.component';

describe('CardTournamentInscriptionComponent', () => {
  let component: CardTournamentInscriptionComponent;
  let fixture: ComponentFixture<CardTournamentInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardTournamentInscriptionComponent],
    });
    fixture = TestBed.createComponent(CardTournamentInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
