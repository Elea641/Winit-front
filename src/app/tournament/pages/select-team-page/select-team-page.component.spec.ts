import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTeamPageComponent } from './select-team-page.component';

describe('SelectTeamPageComponent', () => {
  let component: SelectTeamPageComponent;
  let fixture: ComponentFixture<SelectTeamPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectTeamPageComponent],
    });
    fixture = TestBed.createComponent(SelectTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
