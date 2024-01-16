import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTeamMemberComponent } from './card-team-member.component';

describe('CardTeamMemberComponent', () => {
  let component: CardTeamMemberComponent;
  let fixture: ComponentFixture<CardTeamMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardTeamMemberComponent]
    });
    fixture = TestBed.createComponent(CardTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
