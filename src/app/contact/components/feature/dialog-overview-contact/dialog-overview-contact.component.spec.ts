import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverviewContactComponent } from './dialog-overview-contact.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DialogOverviewContactComponent', () => {
  let component: DialogOverviewContactComponent;
  let fixture: ComponentFixture<DialogOverviewContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogOverviewContactComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(DialogOverviewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
