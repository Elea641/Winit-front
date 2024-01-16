import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card-details-tournament',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './card-details-tournament.component.html',
  styleUrls: ['./card-details-tournament.component.scss'],
})
export class CardDetailsTournamentComponent {
  @Input() tournamentDetails!: TournamentDetails;
}
