import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  @Output() isDrawerOpenedChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  isDesktop: boolean | undefined = false;
  isLargeDesktop: boolean | undefined = false;
  showFiller = false;
  isDrawerOpened = false;

  constructor(
    private breakpointService: BreakpointService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.addClickOutsideListener();
    this.isDesktop = this.breakpointService.isDesktopDevice();
    this.breakpointService.deviceChanged['isDesktop'].subscribe(
      (isDesktop: boolean) => {
        this.isDesktop = isDesktop;
      }
    );

    this.isLargeDesktop = this.breakpointService.isLargeDesktopDevice();
    this.breakpointService.deviceChanged['isLargeDesktop'].subscribe(
      (isLargeDesktop: boolean) => {
        this.isLargeDesktop = isLargeDesktop;
      }
    );

    console.log(this.isLargeDesktop);
  }

  toggleIcon() {
    this.showFiller = !this.showFiller;
  }

  toggleDrawer() {
    this.drawer.toggle();
    this.isDrawerOpened = this.drawer.opened;
    this.isDrawerOpenedChange.emit(this.isDrawerOpened);
  }

  private addClickOutsideListener() {
    document.addEventListener('click', (event) => {
      const clickedElement = event.target as HTMLElement;

      if (!this.el.nativeElement.contains(clickedElement)) {
        this.drawer.close();
        this.isDrawerOpened = false;
        this.isDrawerOpenedChange.emit(this.isDrawerOpened);
      }
    });
  }
}
