import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMobileComponent } from './sidebar-mobile.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SidebarMobileComponent', () => {
  let component: SidebarMobileComponent;
  let fixture: ComponentFixture<SidebarMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SidebarMobileComponent,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(SidebarMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
