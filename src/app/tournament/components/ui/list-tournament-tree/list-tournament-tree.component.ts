import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTournamentMatchComponent } from '../card-tournament-match/card-tournament-match.component';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.model';
import { HelperTournamentService } from 'src/app/tournament/shared/helpers/helper-tournament.service';

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
  namesTeamListPhase: any;
  namesTeamListRandom: any;

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

    const { randomTeams, remainingTeams } =
      this.helperTournamentService.divideTeamsForPhases(
        this.namesTeamList,
        this.totalPhase.randomMatchs
      );

    this.namesTeamListPhase = {
      remainingTeams,
    };

    this.namesTeamListRandom = {
      randomTeams,
    };
  }

  getObjectKeys(obj: any): any[] {
    return Object.keys(obj);
  }

  getNumberArray(length: number): number[] {
    return new Array(length).fill(0).map((_, index) => index);
  }

  getTeamName(
    index: number,
    phaseKey?: string
  ): { teamName: string; isEven: boolean } {
    const result = { teamName: '', isEven: false };

    if (index >= 0) {
      if (phaseKey === 'randomMatchs') {
        result.teamName = this.namesTeamListRandom.randomTeams[index];
      } else {
        const difference = index - this.totalPhase.count;

        if (difference >= 0 && difference < this.totalPhase.count) {
          result.teamName = '';
        } else {
          result.teamName =
            this.namesTeamListPhase.remainingTeams[index] ?? 'Name';
        }
      }

      result.isEven = index % 2 === 0;
    }

    return result;
  }
}
