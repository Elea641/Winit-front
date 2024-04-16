import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TournamentCard } from '../models/tournament-card.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITournamentListFilterService } from './interfaces/ITournamentListFilter.service';

@Injectable({
  providedIn: 'root',
})

export class TournamentListFilterService
  implements ITournamentListFilterService
{
  constructor(private http: HttpClient) {}

  public baseUrl: string = `${environment.urlApi}/tournaments/filter`;

  filterTournaments(
    searchValue: string,
    chronologicalFilter: boolean,
    selectedSport: string,
    showOnlyUpcomingTournaments: boolean,
    showNonFullTournaments: boolean
  ) {
    const queryParams: string = `?searchValue=${searchValue}&chronologicalFilter=${chronologicalFilter}&selectedSport=${selectedSport}&showOnlyUpcomingTournaments=${showOnlyUpcomingTournaments}&showNonFullTournaments=${showNonFullTournaments}`;
    return this.http.get<any>(this.baseUrl + queryParams);
  }
}
