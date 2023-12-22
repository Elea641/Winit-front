import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tournament } from 'src/app/tournament/models/tournament.model';
import { Observable, map } from 'rxjs';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { TournamentCardComponent } from '../tournament-card/tournament-card.component';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, TournamentCardComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit{
  
  tournaments$!: Observable<Tournament[]>;
  
  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.tournaments$ = this.tournamentService
      .getAllTournaments()
      .pipe(map((data) => data));
  }
}
