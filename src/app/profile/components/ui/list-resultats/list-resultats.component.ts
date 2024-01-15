import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardResultTotalComponent } from '../card-result-total/card-result-total.component';
import { CurrentProfile } from 'src/app/profile/models/current-profile.model';
import { CardResultTournamentComponent } from '../card-result-tournament/card-result-tournament.component';

@Component({
  selector: 'app-list-resultats',
  standalone: true,
  imports: [
    CommonModule,
    CardResultTotalComponent,
    CardResultTournamentComponent,
  ],
  templateUrl: './list-resultats.component.html',
  styleUrls: ['./list-resultats.component.scss'],
})
export class ListResultatsComponent {
  @Input() currentProfile!: CurrentProfile | null;

  getObjectEntries(obj: any): [string, any][] {
    return Object.entries(obj);
  }
}
