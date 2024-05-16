import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, concatMap, of } from 'rxjs';
import { TournamentDetails } from '../../models/tournament-details.model';
import { TournamentService } from '../../shared/tournament.service';
import { MenuTournamentComponent } from '../../components/feature/menu-tournament/menu-tournament.component';
import { CardDetailsTournamentComponent } from '../../components/ui/card-details-tournament/card-details-tournament.component';

@Component({
  selector: 'app-tournament-details-page',
  standalone: true,
  imports: [
    CommonModule,
    CardDetailsTournamentComponent,
    MenuTournamentComponent,
  ],
  templateUrl: './tournament-details-page.component.html',
  styleUrls: ['./tournament-details-page.component.scss'],
})
export class TournamentDetailsPageComponent implements OnInit {
  tournament$!: Observable<TournamentDetails>;
  teamId!: string;
  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    if (this.route.params) {
      this.route.params.subscribe(params => {
        this.teamId = params['id'];
      });
    }

    if (this.route.data) {
      this.tournament$ = this.route.data.pipe(
        concatMap(data => {
          if (data && data['tournament']) {
            return of(data['tournament']);
          } else {
            return this.tournamentService
              .getTournamentById(Number(this.teamId))
              .pipe(catchError(() => of(null)));
          }
        })
      );
    }
  }
}
