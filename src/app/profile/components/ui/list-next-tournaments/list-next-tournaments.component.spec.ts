import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNextTournamentsComponent } from './list-next-tournaments.component';

describe('ListNextTournamentsComponent', () => {
  let component: ListNextTournamentsComponent;
  let fixture: ComponentFixture<ListNextTournamentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListNextTournamentsComponent]
    });
    fixture = TestBed.createComponent(ListNextTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
