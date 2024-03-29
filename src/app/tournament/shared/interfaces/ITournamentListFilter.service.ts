import { Observable } from 'rxjs';
import { TournamentCard } from '../../models/tournament-card.model';

export interface ITournamentListFilterService {
  filterTournamentListBySearchTerm(
    searchValue: string,
    tournaments$: Observable<TournamentCard[]>
  ): any;

  filterTournamentByAlphabeticalOrder(
    filteredTournaments$: Observable<TournamentCard[]>
  ): any;

  filterTournamentListByChronologicalOrder(
    filteredTournaments$: Observable<TournamentCard[]>
  ): any;

  checkIfTournamentIsUpcoming(tournament: TournamentCard): boolean;

  checkIfTournamentIsNotFull(tournament: TournamentCard): boolean;

  filterTournamentBySport(
    filteredTournaments$: Observable<TournamentCard[]>,
    selectedSport: string
  ): any;
}
