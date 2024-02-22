import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Observable, map } from 'rxjs';
import { Tournament } from 'src/app/tournament/models/tournament.model';
import { TournamentListFilterService } from 'src/app/tournament/shared/tournament-list-filter.service';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { CarouselComponent } from '../../../../components/ui/carousel/carousel.component';
import { SidebarComponent } from '../../../../components/ui/sidebar/sidebar.component';
import { TournamentCardComponent } from '../../ui/tournament-card/tournament-card.component';

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
  tournaments$!: Observable<Tournament[]>;
  filteredTournaments$!: Observable<Tournament[]>;
  isDrawerOpened: boolean = false;
  isOpen: string = '';
  searchValue: string = '';
  chronologicalFilter: boolean = false;
  showOnlyUpcomingTournaments: boolean = false;
  showNonFullTournaments: boolean = false;

  constructor(
    private tournamentService: TournamentService,
    private tournamentListFilterService: TournamentListFilterService
  ) {}

  ngOnInit(): void {
    this.tournaments$ = this.tournamentService
      .getAllTournaments()
      .pipe(map((data) => data));
    this.filteredTournaments$ = this.tournaments$;

    if (this.isDrawerOpened === true) {
      this.isOpen = 'open';
    }
  }

  handleDrawerChange(isDrawerOpened: boolean) {
    this.isDrawerOpened = isDrawerOpened;
    this.isOpen = isDrawerOpened ? 'open' : 'close';
  }

  onReceiveSearchValueFromSidebar(value: string) {
    this.searchValue = value;
    this.filterTournamentListBySearchTerm(value);
  }

  filterTournamentListBySearchTerm(searchValue: string) {
    this.filteredTournaments$ =
      this.tournamentListFilterService.filterTournamentListBySearchTerm(
        searchValue,
        this.tournaments$
      );
  }

  onReceiveChronologicalFilterChange(value: boolean) {
    this.chronologicalFilter = value;

    if (this.chronologicalFilter === true) {
      this.filteredTournaments$ =
        this.tournamentListFilterService.filterTournamentListByChronologicalOrder(
          this.filteredTournaments$
        );
    } else {
      this.filteredTournaments$ =
        this.tournamentListFilterService.filterTournamentByAlphabeticalOrder(
          this.filteredTournaments$
        );
    }
  }

  onReceiveShowOnlyUpcomingTournaments(value: boolean) {
    this.showOnlyUpcomingTournaments = value;
    this.updateFilteredTournaments();
  }

  onReceiveShowNonFullTournaments(value: boolean) {
    this.showNonFullTournaments = value;
    this.updateFilteredTournaments();
  }

  updateFilteredTournaments() {
    this.filteredTournaments$ = this.filteredTournaments$.pipe(
      map((tournaments) => {
        return tournaments.filter((tournament) => {
          let passesShowOnlyUpcomingTournaments =
            !this.showOnlyUpcomingTournaments ||
            this.tournamentListFilterService.checkIfTournamentIsUpcoming(
              tournament
            );
          let passesShowNonFullTournaments =
            !this.showNonFullTournaments ||
            this.tournamentListFilterService.checkIfTournamentIsNotFull(
              tournament
            );
          return (
            passesShowOnlyUpcomingTournaments && passesShowNonFullTournaments
          );
        });
      })
    );
  }

  onReceiveResetFilters(event: any) {
    this.filteredTournaments$ = this.tournaments$;
    this.chronologicalFilter = false;
    this.showOnlyUpcomingTournaments = false;
    this.showNonFullTournaments = false;
  }
}
