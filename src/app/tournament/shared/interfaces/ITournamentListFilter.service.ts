export interface ITournamentListFilterService {
  filterTournaments(
    searchValue: string,
    chronologicalFilter: boolean,
    selectedSport: string,
    showOnlyUpcomingTournaments: boolean,
    showNonFullTournaments: boolean
  ): any;
}
