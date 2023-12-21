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
  tournaments$!: Observable<Tournament[]>;

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.tournaments$ = this.tournamentService
      .getAllTournaments()
      .pipe(map((data) => data));
  }
}
