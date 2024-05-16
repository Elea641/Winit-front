import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCurrentProfileComponent } from './card-current-profile.component';
import { ActivatedRoute } from '@angular/router';

describe('CardCurrentProfileComponent', () => {
  let component: CardCurrentProfileComponent;
  let fixture: ComponentFixture<CardCurrentProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardCurrentProfileComponent],
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
    fixture = TestBed.createComponent(CardCurrentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
