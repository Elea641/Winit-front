import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentDetailsComponent } from '../../ui/tournament-details/tournament-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ListTeamsTournamentComponent } from '../../ui/list-teams-tournament/list-teams-tournament.component';
import { ListTournamentTreeComponent } from '../../ui/list-tournament-tree/list-tournament-tree.component';
import { Observable } from 'rxjs';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.type';

@Component({
  selector: 'app-menu-tournament',
  standalone: true,
  imports: [
    CommonModule,
    TournamentDetailsComponent,
    ListTeamsTournamentComponent,
    ListTournamentTreeComponent,
    MatTabsModule,
  ],
  templateUrl: './menu-tournament.component.html',
  styleUrls: ['./menu-tournament.component.scss'],
})
export class MenuTournamentComponent {
  @Input() isGenerated = false;
  @Input() tournament$!: Observable<TournamentDetails>;

  getGenerated(event: boolean): void {
    this.isGenerated = event;
  }
}
