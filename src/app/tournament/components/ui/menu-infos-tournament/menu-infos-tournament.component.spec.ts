import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInfosTournamentComponent } from './menu-infos-tournament.component';

describe('MenuInfosTournamentComponent', () => {
  let component: MenuInfosTournamentComponent;
  let fixture: ComponentFixture<MenuInfosTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuInfosTournamentComponent]
    });
    fixture = TestBed.createComponent(MenuInfosTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
