import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingPageComponent } from './ranking-page.component';
import { ActivatedRoute } from '@angular/router';

describe('RankingPageComponent', () => {
  let component: RankingPageComponent;
  let fixture: ComponentFixture<RankingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RankingPageComponent],
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
    fixture = TestBed.createComponent(RankingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
