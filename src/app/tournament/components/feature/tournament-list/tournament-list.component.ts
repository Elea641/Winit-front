import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tournament } from 'src/app/tournament/models/tournament.model';
import { Observable, map } from 'rxjs';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss'],
})
export class TournamentListComponent implements OnInit {
  tournaments!: Tournament[];

  tournamentList: Tournament[] = [
    new Tournament(1, 'Tournoi A', 10),
    new Tournament(2, 'Tournoi B', 8),
    new Tournament(3, 'Tournoi C', 12),
  ];

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.tournaments = this.tournamentList;
  }
}
