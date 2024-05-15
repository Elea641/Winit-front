import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfileDialogComponent } from './delete-profile-dialog.component';

describe('DeleteProfileDialogComponent', () => {
  let component: DeleteProfileDialogComponent;
  let fixture: ComponentFixture<DeleteProfileDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeleteProfileDialogComponent],
    });
    fixture = TestBed.createComponent(DeleteProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
