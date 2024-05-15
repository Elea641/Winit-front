import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailCardComponent } from './team-detail-card.component';

describe('TeamDetailCardComponent', () => {
  let component: TeamDetailCardComponent;
  let fixture: ComponentFixture<TeamDetailCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeamDetailCardComponent],
    });
    fixture = TestBed.createComponent(TeamDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
