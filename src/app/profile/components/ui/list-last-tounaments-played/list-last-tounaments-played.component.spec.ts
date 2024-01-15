import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLastTounamentsPlayedComponent } from './list-last-tounaments-played.component';

describe('ListLastTounamentsPlayedComponent', () => {
  let component: ListLastTounamentsPlayedComponent;
  let fixture: ComponentFixture<ListLastTounamentsPlayedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListLastTounamentsPlayedComponent]
    });
    fixture = TestBed.createComponent(ListLastTounamentsPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
