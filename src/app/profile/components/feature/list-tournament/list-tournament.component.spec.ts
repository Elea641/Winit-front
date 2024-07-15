import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTournamentComponent } from './list-tournament.component';
import { HttpClientModule } from '@angular/common/http';

describe('ListTournamentComponent', () => {
  let component: ListTournamentComponent;
  let fixture: ComponentFixture<ListTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListTournamentComponent, HttpClientModule],
    });
    fixture = TestBed.createComponent(ListTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
