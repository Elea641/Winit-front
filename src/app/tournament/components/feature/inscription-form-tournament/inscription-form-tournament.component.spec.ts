import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionFormTournamentComponent } from './inscription-form-tournament.component';

describe('InscriptionFormTournamentComponent', () => {
  let component: InscriptionFormTournamentComponent;
  let fixture: ComponentFixture<InscriptionFormTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InscriptionFormTournamentComponent]
    });
    fixture = TestBed.createComponent(InscriptionFormTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
