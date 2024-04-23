import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, concatMap, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ListTeamBySportComponent } from '../../components/feature/list-team-by-sport/list-team-by-sport.component';
import { MatDividerModule } from '@angular/material/divider';
import { TournamentDetails } from '../../models/tournament-details.model';
import { TeamService } from 'src/app/team/shared/team.service';
import { InscriptionFormTournamentComponent } from '../../components/feature/inscription-form-tournament/inscription-form-tournament.component';
import { Team } from 'src/app/team/models/team.model';
@Component({
  selector: 'app-select-team-page',
  standalone: true,
  imports: [
    CommonModule,
    ListTeamBySportComponent,
    MatDividerModule,
    InscriptionFormTournamentComponent,
  ],
  templateUrl: './select-team-page.component.html',
  styleUrls: ['./select-team-page.component.scss'],
})
export class SelectTeamPageComponent {
  tournament$!: Observable<TournamentDetails | null>;
  teams$!: Observable<Team[] | null>;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.tournament$ = this.route.data.pipe(
      concatMap((data) => {
        return of(data['tournament']);
      })
    );
    this.tournament$.subscribe((tournament) => {
      if (tournament) {
        this.teamService
          .getAllTeamsByUserForTournament(tournament?.sport)
          .subscribe((teams) => {
            console.log(teams);

            if (teams) {
              this.teams$ = of(teams);
            } else {
              this.teams$ = of([]);
            }
          });
      }
    });
  }
}
