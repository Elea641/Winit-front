import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentDetailsComponent } from '../../components/feature/tournament-details/tournament-details.component';

@Component({
  selector: 'app-tournament-details-page',
  standalone: true,
  imports: [CommonModule, TournamentDetailsComponent],
  templateUrl: './tournament-details-page.component.html',
  styleUrls: ['./tournament-details-page.component.scss'],
})
export class TournamentDetailsPageComponent {}
