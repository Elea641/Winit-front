import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardResultTotalComponent } from '../../ui/card-result-total/card-result-total.component';
import { CardResultTournamentComponent } from '../../ui/card-result-tournament/card-result-tournament.component';
import { UserStatistics } from 'src/app/profile/models/user-statistics.model';
import { ListTournamentInscriptionComponent } from '../list-tournament-inscription/list-tournament-inscription.component';
import {
  StatesEnumType,
  StatesType,
} from 'src/app/profile/models/state-type.model';

@Component({
  selector: 'app-list-results',
  standalone: true,
  imports: [
    CommonModule,
    CardResultTotalComponent,
    CardResultTournamentComponent,
    ListTournamentInscriptionComponent,
  ],
  templateUrl: './list-results.component.html',
  styleUrls: ['./list-results.component.scss'],
})
export class ListResultsComponent {
  @Input() userStatistics!: UserStatistics | null;

  getObjectEntriesResult(states: UserStatistics | null): StatesEnumType[] {
    if (states) {
      return Object.entries(states).filter(
        ([key, _]) =>
          key !== 'podium' &&
          key !== 'participation' &&
          key !== 'lastTournaments' &&
          key !== 'nextTournaments'
      );
    }
    return [];
  }

  getObjectEntriesInscription(states: UserStatistics | null): StatesType[] {
    if (states) {
      return Object.entries(states).filter(
        ([key, _]) => key === 'lastTournaments' || key === 'nextTournaments'
      );
    }
    return [];
  }
}
