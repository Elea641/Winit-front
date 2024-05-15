import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTournamentTreeComponent } from './list-tournament-tree.component';

describe('ListTournamentTreeComponent', () => {
  let component: ListTournamentTreeComponent;
  let fixture: ComponentFixture<ListTournamentTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListTournamentTreeComponent],
    });
    fixture = TestBed.createComponent(ListTournamentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
