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
  chronologicalFilter: boolean = false;
  showOnlyUpcomingTournaments: boolean = false;
  showNonFullTournaments: boolean = false;
  isDesktop: boolean | undefined = false;
  isLargeDesktop: boolean | undefined = false;
  showFiller = false;
  isDrawerOpened = false;

  sports = [{ name: 'volley' }, { name: 'football' }, { name: 'basket' }];
  selectedSport: string = '';

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
