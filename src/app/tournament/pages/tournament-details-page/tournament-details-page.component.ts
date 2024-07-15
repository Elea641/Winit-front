import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, concatMap, of } from 'rxjs';
import { TournamentService } from '../../shared/tournament.service';
import { MenuTournamentComponent } from '../../components/feature/menu-tournament/menu-tournament.component';
import { TournamentDetailsComponent } from '../../components/ui/tournament-details/tournament-details.component';
import { TournamentDetails } from '../../models/tournament-details.type';

@Component({
  selector: 'app-tournament-details-page',
  standalone: true,
  imports: [CommonModule, TournamentDetailsComponent, MenuTournamentComponent],
  templateUrl: './tournament-details-page.component.html',
  styleUrls: ['./tournament-details-page.component.scss'],
})
export class TournamentDetailsPageComponent implements OnInit {
  tournament$!: Observable<TournamentDetails>;
  teamId!: number;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap) {
      Number(this.route.snapshot.paramMap.get('id'));
    }

    if (this.route.data) {
      this.tournament$ = this.route.data.pipe(
        concatMap(data => {
          if (data && data['tournament']) {
            return of(data['tournament']);
          } else {
            return this.tournamentService
              .getTournamentById(this.teamId)
              .pipe(catchError(() => of(null)));
          }
        })
      );
    }
  }
}
