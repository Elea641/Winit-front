import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardResultTotalComponent } from '../../ui/card-result-total/card-result-total.component';
import { CardResultTournamentComponent } from '../../ui/card-result-tournament/card-result-tournament.component';
import { UserStatistics } from 'src/app/profile/models/user-statistics.model';
import { ListTournamentInscriptionComponent } from '../list-tournament-inscription/list-tournament-inscription.component';

@Component({
  selector: 'app-list-resultats',
  standalone: true,
  imports: [
    CommonModule,
    CardResultTotalComponent,
    CardResultTournamentComponent,
    ListTournamentInscriptionComponent,
  ],
  templateUrl: './list-resultats.component.html',
  styleUrls: ['./list-resultats.component.scss'],
})
export class ListResultatsComponent {
  @Input() userStatistics!: UserStatistics | null;

  getObjectEntriesResult(obj: any): [string, any][] {
    return Object.entries(obj).filter(
      ([key, _]) =>
        key !== 'podium' &&
        key !== 'participation' &&
        key !== 'lastTournaments' &&
        key !== 'nextTournaments'
    );
  }

  getObjectEntriesInscription(obj: any): [string, any][] {
    return Object.entries(obj).filter(
      ([key, _]) => key === 'lastTournaments' || key === 'nextTournaments'
    );
  }
}
