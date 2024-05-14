import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTournamentComponent } from './menu-tournament.component';

describe('MenuTournamentComponent', () => {
  let component: MenuTournamentComponent;
  let fixture: ComponentFixture<MenuTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuTournamentComponent],
    });
    fixture = TestBed.createComponent(MenuTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
