import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { InputSearchComponent } from '../../feature/input-search/input-search.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointService } from '../../../shared/breakpoint.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    InputSearchComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  isMobile: boolean | undefined = false;
  showFiller = false;
  isDrawerOpened = false;

  constructor(
    private breakpointService: BreakpointService,
    private el: ElementRef
  ) {
    this.isMobile = this.breakpointService.isMobileDevice();
    this.breakpointService.isMobileChanged.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  ngOnInit(): void {
    this.addClickOutsideListener();
  }

  toggleIcon() {
    this.showFiller = !this.showFiller;
  }

  toggleDrawer() {
    this.drawer.toggle();
    this.isDrawerOpened = this.drawer.opened;
  }

  private addClickOutsideListener() {
    document.addEventListener('click', (event) => {
      const clickedElement = event.target as HTMLElement;

      if (!this.el.nativeElement.contains(clickedElement)) {
        this.drawer.close();
        this.isDrawerOpened = false;
      }
    });
  }
}
