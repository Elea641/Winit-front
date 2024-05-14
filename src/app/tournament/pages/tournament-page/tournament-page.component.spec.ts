import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPageComponent } from './tournament-page.component';

describe('TournamentPageComponent', () => {
  let component: TournamentPageComponent;
  let fixture: ComponentFixture<TournamentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TournamentPageComponent],
    });
    fixture = TestBed.createComponent(TournamentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
