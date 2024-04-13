import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TournamentCard } from '../models/tournament-card.model';
import { ITournamentListFilterService } from './interfaces/ITournamentListFilter.service';

@Injectable({
  providedIn: 'root',
})
export class TournamentListFilterService
  implements ITournamentListFilterService
{
  constructor() {}

  filterTournamentListBySearchTerm(
    searchValue: string,
    tournaments$: Observable<TournamentCard[]>
  ) {
    return tournaments$.pipe(
      map((tournaments: TournamentCard[]) => {
        return tournaments.filter(
          (tournament: TournamentCard) =>
            tournament.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            tournament.place
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            tournament.sport.toLowerCase().includes(searchValue.toLowerCase())
        );
      })
    );
  }

  filterTournamentByAlphabeticalOrder(
    filteredTournaments$: Observable<TournamentCard[]>
  ) {
    return filteredTournaments$.pipe(
      map((tournaments) =>
        tournaments.sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  }

  filterTournamentListByChronologicalOrder(
    filteredTournaments$: Observable<TournamentCard[]>
  ) {
    return filteredTournaments$.pipe(
      map((tournaments) =>
        tournaments.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      )
    );
  }

  checkIfTournamentIsUpcoming(tournament: TournamentCard): boolean {
    return (
      new Date(tournament.date).setHours(0, 0, 0, 0) >=
      new Date().setHours(0, 0, 0, 0)
    );
  }

  checkIfTournamentIsNotFull(tournament: TournamentCard): boolean {
    return (
      tournament.currentNumberOfParticipants! < tournament.maxNumberOfTeams
    );
  }

  filterTournamentBySport(
    filteredTournaments$: Observable<TournamentCard[]>,
    selectedSport: string
  ) {
    return filteredTournaments$.pipe(
      map((tournaments: TournamentCard[]) => {
        return tournaments.filter(
          (tournament: TournamentCard) => tournament.sport === selectedSport
        );
      })
    );
  }
}
