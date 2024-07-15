import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCardComponent } from './team-card.component';
import { ActivatedRoute } from '@angular/router';

describe('TeamCardComponent', () => {
  let component: TeamCardComponent;
  let fixture: ComponentFixture<TeamCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeamCardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '',
              },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(TeamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
