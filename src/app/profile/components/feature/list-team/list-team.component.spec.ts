import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTeamComponent } from './list-team.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';

describe('ListTeamComponent', () => {
  let component: ListTeamComponent;
  let fixture: ComponentFixture<ListTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListTeamComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [ToastService, ToastrService],
    });
    fixture = TestBed.createComponent(ListTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
