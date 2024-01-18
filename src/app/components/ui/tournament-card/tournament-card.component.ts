import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Tournament } from 'src/app/tournament/models/tournament.model';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-tournament-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatBadgeModule],
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.scss']
})
export class TournamentCardComponent {

  @Input()
  public tournament!: Tournament;
}
