import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BreakpointService } from '../../../shared/breakpoint.service';
import { InputSearchComponent } from '../../feature/input-search/input-search.component';
import { SidebarService } from 'src/app/shared/sidebar.service';
import { SidebarDesktopComponent } from './sidebar-desktop/sidebar-desktop.component';
import { SidebarMobileComponent } from './sidebar-mobile/sidebar-mobile.component';

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
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    SidebarDesktopComponent,
    SidebarMobileComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  @Output() isDrawerOpenedChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() newSearchValueEventFromSidebar = new EventEmitter<string>();
  @Output() newChronologicalFilterChange = new EventEmitter<boolean>();
  @Output() newShowOnlyUpcomingTournaments = new EventEmitter<boolean>();
  @Output() newShowNonFullTournaments = new EventEmitter<boolean>();
  @Output() newResetFilter = new EventEmitter<any>();
  @Output() newSportFilter = new EventEmitter<string>();
  @Output() newApplyFilters = new EventEmitter<any>();
  chronologicalFilter = false;
  showOnlyUpcomingTournaments = false;
  showNonFullTournaments = false;
  isDesktop: boolean | undefined = false;
  isLargeDesktop: boolean | undefined = false;
  showFiller = false;
  isDrawerOpened = false;
  selectedSport = '';

  constructor(
    private breakpointService: BreakpointService,
    private el: ElementRef,
    private sidebarService: SidebarService
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

    this.sidebarService.isOpen$.subscribe((isOpen: boolean) => {
      this.isDrawerOpened = isOpen;
    });
  }

  onReceiveDrawerChange(value: boolean) {
    this.isDrawerOpened = value;
    this.isDrawerOpenedChange.emit(this.isDrawerOpened);
  }

  toggleIcon() {
    this.showFiller = !this.showFiller;
  }
  toggleDrawer() {
    this.drawer.toggle();
    this.isDrawerOpened = this.drawer.opened;
    this.isDrawerOpenedChange.emit(this.isDrawerOpened);
    this.sidebarService.isOpenSubject.next(this.isDrawerOpened);
  }
  private addClickOutsideListener() {
    document.addEventListener('click', event => {
      const clickedElement = event.target as HTMLElement;
      if (this.isDesktop) {
        if (!this.el.nativeElement.contains(clickedElement)) {
          this.drawer.close();
          this.isDrawerOpened = false;
          this.isDrawerOpenedChange.emit(this.isDrawerOpened);
        }
      }
    });
  }
  onReceiveSearchValueFromInput(value: any) {
    this.newSearchValueEventFromSidebar.emit(value);
    if (value.length < 1) {
      this.selectedSport = '';
    }
  }

  onReceiveChronologicalFilterChange(value: any) {
    //console.log('value', value);
    this.newChronologicalFilterChange.emit(value);
  }

  onReceiveShowOnlyUpcomingTournamentsChange(value: any) {
    //console.log('value', value);
    this.newShowOnlyUpcomingTournaments.emit(value);
  }

  onReceiveShowNonFullTournamentsChange(value: any) {
    //console.log('value', value);
    this.newShowNonFullTournaments.emit(value);
  }

  onReceiveSportFilterChange(value: any) {
    this.newSportFilter.emit(value);
  }

  onReceiveApplyFilters(value: any) {
    //console.log('value', value);
    this.newApplyFilters.emit(value);
  }

  onReceiveResetFilters(value: any) {
    // console.log('value', value);
    this.newResetFilter.emit(value);
  }

  sendApplyFilters() {
    this.newApplyFilters.emit();
  }

  sendChronologicalFilterChangeToParent() {
    this.chronologicalFilter = !this.chronologicalFilter;
    this.newChronologicalFilterChange.emit(this.chronologicalFilter);
  }

  sendShowOnlyUpcomingTournamentsToParent() {
    this.showOnlyUpcomingTournaments = !this.showOnlyUpcomingTournaments;
    this.newShowOnlyUpcomingTournaments.emit(this.showOnlyUpcomingTournaments);
  }

  sendShowNonFullTournaments() {
    this.showNonFullTournaments = !this.showNonFullTournaments;
    this.newShowNonFullTournaments.emit(this.showNonFullTournaments);
  }

  sendSportFilter(value: string) {
    this.newSportFilter.emit(value);
    this.showNonFullTournaments = false;
    this.showOnlyUpcomingTournaments = false;
  }

  sendResetFilters() {
    this.newResetFilter.emit();
    this.chronologicalFilter = false;
    this.showOnlyUpcomingTournaments = false;
    this.showNonFullTournaments = false;
    this.selectedSport = '';
  }
}
