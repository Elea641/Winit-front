import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { InputSearchComponent } from 'src/app/components/feature/input-search/input-search.component';
import { SportService } from 'src/app/sport/shared/sport.service';

@Component({
  selector: 'app-sidebar-mobile',
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
  templateUrl: './sidebar-mobile.component.html',
  styleUrls: ['./sidebar-mobile.component.scss'],
})
export class SidebarMobileComponent implements OnInit {
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

  sports: string[] = [];
  selectedSport = '';

  constructor(private sportService: SportService) {}

  ngOnInit(): void {
    this.getSportsNames();
  }

  getSportsNames() {
    this.sportService
      .getAllSportsNames()
      .subscribe(sports => (this.sports = sports));
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
