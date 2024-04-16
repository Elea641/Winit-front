import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Observable, map } from 'rxjs';
import { TournamentListFilterService } from 'src/app/tournament/shared/tournament-list-filter.service';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { CarouselComponent } from '../../../../components/ui/carousel/carousel.component';
import { SidebarComponent } from '../../../../components/ui/sidebar/sidebar.component';
import { TournamentCardComponent } from '../../ui/tournament-card/tournament-card.component';
import { TournamentCard } from 'src/app/tournament/models/tournament-card.model';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [
    CommonModule,
    TournamentCardComponent,
    CarouselComponent,
    SidebarComponent,
    MatDividerModule,
  ],
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss'],
})
export class TournamentListComponent implements OnInit {
  filteredTournaments$!: Observable<TournamentCard[]>;
  isDrawerOpened: boolean = false;
  isOpen: string = '';
  searchValue: string = '';
  chronologicalFilter: boolean = false;
  showOnlyUpcomingTournaments: boolean = false;
  showNonFullTournaments: boolean = false;
  selectedSport: string = '';

  constructor(
    private tournamentService: TournamentService,
    private tournamentListFilterService: TournamentListFilterService
  ) {}

  ngOnInit(): void {
    this.applyFilters();

    if (this.isDrawerOpened === true) {
      this.isOpen = 'open';
    }
  }

  handleDrawerChange(isDrawerOpened: boolean) {
    this.isDrawerOpened = isDrawerOpened;
    this.isOpen = isDrawerOpened ? 'open' : 'close';
  }

  onReceiveApplyFilters(event: any) {
    console.log('recu');

    this.applyFilters();
  }

  onReceiveSearchValueFromSidebar(value: string) {
    this.searchValue = value;
    this.applyFilters();
  }

  onReceiveChronologicalFilterChange(value: boolean) {
    this.chronologicalFilter = value;
  }

  onReceiveShowOnlyUpcomingTournaments(value: boolean) {
    this.showOnlyUpcomingTournaments = value;
  }

  onReceiveShowNonFullTournaments(value: boolean) {
    this.showNonFullTournaments = value;
  }

  onReceiveSportFilter(value: string) {
    this.selectedSport = value;
    this.showNonFullTournaments = false;
    this.showOnlyUpcomingTournaments = false;
  }

  applyFilters() {
    this.filteredTournaments$ = this.tournamentListFilterService
      .filterTournaments(
        this.searchValue,
        this.chronologicalFilter,
        this.selectedSport,
        this.showOnlyUpcomingTournaments,
        this.showNonFullTournaments
      )
      .pipe(map((data) => data));
  }

  onReceiveResetFilters(event: any) {
    this.filteredTournaments$ = this.tournamentService.getAllTournaments();
    this.chronologicalFilter = false;
    this.showOnlyUpcomingTournaments = false;
    this.showNonFullTournaments = false;
    this.selectedSport = '';
  }
}
