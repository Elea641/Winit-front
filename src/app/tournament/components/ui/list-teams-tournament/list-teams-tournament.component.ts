import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.model';

@Component({
  selector: 'app-list-teams-tournament',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './list-teams-tournament.component.html',
  styleUrls: ['./list-teams-tournament.component.scss'],
})
export class ListTeamsTournamentComponent {
  @Input() tournamentDetails!: TournamentDetails;
  totalinscription!: number;
  ngOnInit(): void {
    this.totalinscription = this.tournamentDetails.teams.length;
  }
}
