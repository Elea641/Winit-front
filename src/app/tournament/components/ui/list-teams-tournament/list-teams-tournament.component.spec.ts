import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTeamsTournamentComponent } from './list-teams-tournament.component';

describe('ListTeamsTournamentComponent', () => {
  let component: ListTeamsTournamentComponent;
  let fixture: ComponentFixture<ListTeamsTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListTeamsTournamentComponent]
    });
    fixture = TestBed.createComponent(ListTeamsTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
