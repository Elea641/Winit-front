import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Tournament } from '../models/tournament.model';

@Injectable({
  providedIn: 'root',
})
export class TournamentListFilterService {
  constructor() {}

  filterTournamentListBySearchTerm(
    searchValue: string,
    tournaments$: Observable<Tournament[]>
  ) {
    return tournaments$.pipe(
      map((tournaments: Tournament[]) => {
        return tournaments.filter(
          (tournament: Tournament) =>
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
    filteredTournaments$: Observable<Tournament[]>
  ) {
    return filteredTournaments$.pipe(
      map((tournaments) =>
        tournaments.sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  }

  filterTournamentListByChronologicalOrder(
    filteredTournaments$: Observable<Tournament[]>
  ) {
    return filteredTournaments$.pipe(
      map((tournaments) =>
        tournaments.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      )
    );
  }

  checkIfTournamentIsUpcoming(tournament: Tournament): boolean {
    return (
      new Date(tournament.date).setHours(0, 0, 0, 0) >=
      new Date().setHours(0, 0, 0, 0)
    );
  }

  checkIfTournamentIsNotFull(tournament: Tournament): boolean {
    return tournament.currentPlayers! < tournament.maxPlayers;
  }
}
