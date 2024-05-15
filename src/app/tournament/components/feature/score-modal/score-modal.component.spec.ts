import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreModalComponent } from './score-modal.component';

describe('ScoreModalComponent', () => {
  let component: ScoreModalComponent;
  let fixture: ComponentFixture<ScoreModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScoreModalComponent],
    });
    fixture = TestBed.createComponent(ScoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
