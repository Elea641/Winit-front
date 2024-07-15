import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfileDialogComponent } from './delete-profile-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';

describe('DeleteProfileDialogComponent', () => {
  let component: DeleteProfileDialogComponent;
  let fixture: ComponentFixture<DeleteProfileDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DeleteProfileDialogComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
      providers: [ToastService, ToastrService],
    });
    fixture = TestBed.createComponent(DeleteProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
