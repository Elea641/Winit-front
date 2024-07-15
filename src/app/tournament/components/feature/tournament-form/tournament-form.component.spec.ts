import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentFormComponent } from './tournament-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TournamentFormComponent', () => {
  let component: TournamentFormComponent;
  let fixture: ComponentFixture<TournamentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TournamentFormComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [ToastService, ToastrService],
    });
    fixture = TestBed.createComponent(TournamentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
