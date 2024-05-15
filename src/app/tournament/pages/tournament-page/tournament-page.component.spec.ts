import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPageComponent } from './tournament-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TournamentPageComponent', () => {
  let component: TournamentPageComponent;
  let fixture: ComponentFixture<TournamentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TournamentPageComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [ToastService, ToastrService],
    });
    fixture = TestBed.createComponent(TournamentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
