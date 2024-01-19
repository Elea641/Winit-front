import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.model';
import { MenuInfosTournamentComponent } from '../../ui/menu-infos-tournament/menu-infos-tournament.component';
import { CardDetailsTournamentComponent } from '../../ui/card-details-tournament/card-details-tournament.component';
import { ListTeamsTournamentComponent } from '../../ui/list-teams-tournament/list-teams-tournament.component';
import { ListTournamentTreeComponent } from '../../ui/list-tournament-tree/list-tournament-tree.component';

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [
    CommonModule,
    MenuInfosTournamentComponent,
    CardDetailsTournamentComponent,
    ListTeamsTournamentComponent,
    ListTournamentTreeComponent,
  ],
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss'],
})
export class TournamentDetailsComponent {
  tournamentDetails$!: Observable<TournamentDetails>;
  buttonValueClicked: string = 'matchs';

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.tournamentDetails$ = this.tournamentService.getTournamentById();
  }

  onButtonClicked(value: string) {
    this.buttonValueClicked = value;
  }
}