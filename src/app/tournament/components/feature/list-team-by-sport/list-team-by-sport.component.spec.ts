import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTeamBySportComponent } from './list-team-by-sport.component';

describe('ListTeamBySportComponent', () => {
  let component: ListTeamBySportComponent;
  let fixture: ComponentFixture<ListTeamBySportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListTeamBySportComponent],
    });
    fixture = TestBed.createComponent(ListTeamBySportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
