import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Observable, map } from 'rxjs';
import { TournamentListFilterService } from 'src/app/tournament/shared/tournament-list-filter.service';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { CarouselComponent } from '../../../../components/ui/carousel/carousel.component';
import { SidebarComponent } from '../../../../components/ui/sidebar/sidebar.component';
import { TournamentCardComponent } from '../../ui/tournament-card/tournament-card.component';
import { TournamentCard } from 'src/app/tournament/models/tournament-card.type';
import { SpinnerComponent } from 'src/app/components/ui/spinner/spinner.component';
import { PaginationComponent } from 'src/app/components/feature/pagination/pagination.component';
import { PageEvent } from '@angular/material/paginator';
import { PaginationService } from 'src/app/components/feature/pagination/shared/pagination.service';
import { EntityNames } from 'src/app/shared/enums/entity_names.enum';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [
    CommonModule,
    TournamentCardComponent,
    CarouselComponent,
    SidebarComponent,
    MatDividerModule,
    SpinnerComponent,
    PaginationComponent,
  ],
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss'],
})
export class TournamentListComponent implements OnInit {
  filteredTournaments$!: Observable<TournamentCard[]>;
  isDrawerOpened = false;
  isOpen = '';
  searchValue = '';
  chronologicalFilter = false;
  showOnlyUpcomingTournaments = false;
  showNonFullTournaments = false;
  selectedSport = '';
  isLoading = true;

  tournamentsNumber = 0;
  pageSize = 10;
  currentPageIndex = 0;

  constructor(
    private tournamentService: TournamentService,
    private tournamentListFilterService: TournamentListFilterService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.tournamentService.getAllTournaments().subscribe(response => {
      this.isLoading = false;
      this.tournamentsNumber = response.length;
    });

    this.filteredTournaments$ = this.paginationService.getEntityPaginated(
      EntityNames.tournament,
      this.currentPageIndex,
      this.pageSize
    );

    if (this.isDrawerOpened === true) {
      this.isOpen = 'open';
    }
  }

  changePage(pageEvent: PageEvent) {
    this.tournamentsNumber = pageEvent.length;
    this.pageSize = pageEvent.pageSize;
    this.currentPageIndex = pageEvent.pageIndex;
    this.filteredTournaments$ = this.paginationService.getEntityPaginated(
      EntityNames.tournament,
      this.currentPageIndex,
      this.pageSize
    );
  }

  handleDrawerChange(isDrawerOpened: boolean) {
    this.isDrawerOpened = isDrawerOpened;
    this.isOpen = isDrawerOpened ? 'open' : 'close';
  }

  onReceiveApplyFilters() {
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
      .pipe(map(data => data));
  }

  onReceiveResetFilters() {
    this.filteredTournaments$ = this.tournamentService.getAllTournaments();
    this.chronologicalFilter = false;
    this.showOnlyUpcomingTournaments = false;
    this.showNonFullTournaments = false;
    this.selectedSport = '';
  }
}
