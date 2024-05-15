import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTournamentComponent } from './menu-tournament.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MenuTournamentComponent', () => {
  let component: MenuTournamentComponent;
  let fixture: ComponentFixture<MenuTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MenuTournamentComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '',
              },
            },
          },
        },
        ToastrService,
        ToastService,
      ],
    });
    fixture = TestBed.createComponent(MenuTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
