import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDesktopComponent } from './sidebar-desktop.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SidebarDesktopComponent', () => {
  let component: SidebarDesktopComponent;
  let fixture: ComponentFixture<SidebarDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SidebarDesktopComponent,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(SidebarDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
