import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTournamentMatchComponent } from '../card-tournament-match/card-tournament-match.component';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.model';
import { HelperTournamentService } from 'src/app/tournament/shared/helper-tournament.service';

@Component({
  selector: 'app-list-tournament-tree',
  standalone: true,
  imports: [CommonModule, CardTournamentMatchComponent],
  templateUrl: './list-tournament-tree.component.html',
  styleUrls: ['./list-tournament-tree.component.scss'],
})
export class ListTournamentTreeComponent {
  @Input() tournamentDetails!: TournamentDetails;
  convertedSelection: string | undefined;
  tournamentPhase!: any;

  constructor(private helperTournamentService: HelperTournamentService) {}

  ngOnInit(): void {
    const totalTeams = 9;

    const totalPhase = this.helperTournamentService.calculPhase(totalTeams);

    this.tournamentPhase =
      this.helperTournamentService.convertToTournamentPhase(totalPhase);
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
