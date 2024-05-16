import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentProfileDetailsComponent } from './current-profile-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CurrentProfileDetailsComponent', () => {
  let component: CurrentProfileDetailsComponent;
  let fixture: ComponentFixture<CurrentProfileDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CurrentProfileDetailsComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [ToastService, ToastrService],
    });
    fixture = TestBed.createComponent(CurrentProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
