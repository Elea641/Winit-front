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

  getTeamName(index: number, phaseKey?: string): string {
    if (index >= 0) {
      if (phaseKey === 'randomMatchs') {
        return this.namesTeamListRandom.randomTeams[index];
      } else {
        const difference = index - this.totalPhase.count;

        if (difference >= 0 && difference < this.totalPhase.count) {
          return '';
        } else {
          return this.namesTeamListPhase.remainingTeams[index] ?? 'Name';
        }
      }
    } else {
      return '';
    }
  }
}
