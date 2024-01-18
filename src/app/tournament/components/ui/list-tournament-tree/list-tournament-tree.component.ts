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
  totalPhase: any;
  namesTeamList: any;

  constructor(private helperTournamentService: HelperTournamentService) {}

  ngOnInit(): void {
    this.totalPhase = this.helperTournamentService.calculPhase(
      this.tournamentDetails.participants
    );

    this.tournamentPhase =
      this.helperTournamentService.convertToTournamentPhase(this.totalPhase);

    this.namesTeamList = this.helperTournamentService.randomizeTeams(
      this.tournamentDetails.teams
    );
  }

  getObjectKeys(obj: any): any[] {
    return Object.keys(obj);
  }

  getNumberArray(length: number): number[] {
    return new Array(length).fill(0).map((_, index) => index);
  }

  getTeamName(index: number): string {
    if (index >= 0 && index < this.namesTeamList.length) {
      return this.namesTeamList[index];
    } else {
      return '';
    }
  }
}
