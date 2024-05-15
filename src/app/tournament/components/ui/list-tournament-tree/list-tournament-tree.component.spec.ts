import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTournamentTreeComponent } from './list-tournament-tree.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';

describe('ListTournamentTreeComponent', () => {
  let component: ListTournamentTreeComponent;
  let fixture: ComponentFixture<ListTournamentTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ListTournamentTreeComponent,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
      providers: [ToastService, ToastrService],
    });
    fixture = TestBed.createComponent(ListTournamentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
