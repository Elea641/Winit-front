import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverviewContactComponent } from './dialog-overview-contact.component';

describe('DialogOverviewContactComponent', () => {
  let component: DialogOverviewContactComponent;
  let fixture: ComponentFixture<DialogOverviewContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogOverviewContactComponent]
    });
    fixture = TestBed.createComponent(DialogOverviewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
