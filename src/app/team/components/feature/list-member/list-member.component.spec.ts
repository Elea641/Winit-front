import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMemberComponent } from './list-member.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from 'src/app/shared/toast.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('ListMemberComponent', () => {
  let component: ListMemberComponent;
  let fixture: ComponentFixture<ListMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListMemberComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [ToastService, ToastrService],
    });
    fixture = TestBed.createComponent(ListMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
