import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTournamentInscriptionComponent } from './list-tournament-inscription.component';

describe('ListTournamentInscriptionComponent', () => {
  let component: ListTournamentInscriptionComponent;
  let fixture: ComponentFixture<ListTournamentInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListTournamentInscriptionComponent],
    });
    fixture = TestBed.createComponent(ListTournamentInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
