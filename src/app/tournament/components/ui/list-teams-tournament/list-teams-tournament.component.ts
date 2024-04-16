import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-teams-tournament',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './list-teams-tournament.component.html',
  styleUrls: ['./list-teams-tournament.component.scss'],
})
export class ListTeamsTournamentComponent {
  @Input() tournament$!: Observable<TournamentDetails>;
}
