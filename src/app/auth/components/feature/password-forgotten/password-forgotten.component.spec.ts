import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForgottenComponent } from './password-forgotten.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PasswordForgottenComponent', () => {
  let component: PasswordForgottenComponent;
  let fixture: ComponentFixture<PasswordForgottenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PasswordForgottenComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [ToastrService, ToastService],
    });
    fixture = TestBed.createComponent(PasswordForgottenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
