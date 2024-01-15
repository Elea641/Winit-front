import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { InputSearchComponent } from '../../feature/input-search/input-search.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  isMobile: boolean = false;
  showFiller = false;
  isDrawerOpened = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private el: ElementRef
  ) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe((result) => {
        this.isMobile = result.matches;
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
