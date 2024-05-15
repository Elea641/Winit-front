import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingCardComponent } from './ranking-card.component';

describe('RankingCardComponent', () => {
  let component: RankingCardComponent;
  let fixture: ComponentFixture<RankingCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RankingCardComponent],
    });
    fixture = TestBed.createComponent(RankingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
