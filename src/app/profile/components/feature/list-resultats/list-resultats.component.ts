import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardResultTotalComponent } from '../../ui/card-result-total/card-result-total.component';
import { CurrentProfile } from 'src/app/profile/models/current-profile.model';
import { CardResultTournamentComponent } from '../../ui/card-result-tournament/card-result-tournament.component';
import { ListLastTounamentsPlayedComponent } from '../../ui/list-last-tounaments-played/list-last-tounaments-played.component';
import { ListNextTournamentsComponent } from '../../ui/list-next-tournaments/list-next-tournaments.component';
import { UserStatistics } from 'src/app/profile/models/user-statistics.model';

@Component({
  selector: 'app-list-resultats',
  standalone: true,
  imports: [
    CommonModule,
    CardResultTotalComponent,
    CardResultTournamentComponent,
    ListLastTounamentsPlayedComponent,
    ListNextTournamentsComponent,
  ],
  templateUrl: './list-resultats.component.html',
  styleUrls: ['./list-resultats.component.scss'],
})
export class ListResultatsComponent {
  @Input() userStatistics!: UserStatistics | null;

  getObjectEntries(obj: any): [string, any][] {
    return Object.entries(obj).filter(
      ([key, _]) =>
        key !== 'podium' &&
        key !== 'participation' &&
        key !== 'lastTournaments' &&
        key !== 'nextTournaments'
    );
  }
}
