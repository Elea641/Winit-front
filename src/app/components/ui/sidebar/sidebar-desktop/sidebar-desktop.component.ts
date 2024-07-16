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
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { InputSearchComponent } from 'src/app/components/feature/input-search/input-search.component';
import { BreakpointService } from 'src/app/shared/breakpoint.service';
import { SidebarService } from 'src/app/shared/sidebar.service';
import { SportService } from 'src/app/sport/shared/sport.service';

@Component({
  selector: 'app-sidebar-desktop',
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
    MatSelectModule,
  ],
  templateUrl: './sidebar-desktop.component.html',
  styleUrls: ['./sidebar-desktop.component.scss'],
})
export class SidebarDesktopComponent implements OnInit {
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

  sports: string[] = [];
  selectedSport = '';

  constructor(
    private breakpointService: BreakpointService,
    private el: ElementRef,
    private sportService: SportService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.getSportsNames();

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

  getSportsNames() {
    this.sportService
      .getAllSportsNames()
      .subscribe(sports => (this.sports = sports));
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

  onReceiveSearchValueFromInput(value: string) {
    this.newSearchValueEventFromSidebar.emit(value);
    if (value.length < 1) {
      this.selectedSport = '';
    }
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
