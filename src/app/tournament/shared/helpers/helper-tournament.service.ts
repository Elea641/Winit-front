import { Injectable } from '@angular/core';
import { IGeneratedTreeResultService } from '../interfaces/IGeneratedTreeResult.service';
import { IHelperTournamentService } from '../interfaces/IHelperTournament.service';
import { Phases } from '../../models/interfaces/phase.interface';
import { TeamHelper } from '../../models/interfaces/team-helper.interface';

@Injectable({
  providedIn: 'root',
})
export class HelperTournamentService implements IHelperTournamentService {
  public calculPhase(totalTeams: number) {
    let phase = 1;
    let randomMatchs = 0;
    let totalMatchesWithoutRandoms = 0;

    while (Math.floor(totalTeams / (phase * 2))) {
      phase *= 2;
      randomMatchs = (totalTeams % phase) * 2;
    }

    totalMatchesWithoutRandoms = totalTeams - randomMatchs;

    return { phase, randomMatchs, totalMatchesWithoutRandoms };
  }

  private convertToTournamentPhase(totalPhase: {
    phase: number;
    randomMatchs: any;
    totalMatchesWithoutRandoms: any;
  }): object {
    let numRounds = 0;
    let teamsRemaining = totalPhase.phase;

    while (teamsRemaining > 1) {
      teamsRemaining /= 2;
      numRounds++;
    }

    const phases: Phases = {
      phase1: 'Finale',
      phase2: 'Demi-finale',
      phase3: 'Quart de finale',
      phase4: 'Huitièmes de finale',
      phase5: 'Seizièmes de finale',
      phase6: 'Phase préliminaire',
      phase7: 'Phase de préqualification',
    };

    const totalPhaseMatchs = {
      phase1: 2,
      phase2: 4,
      phase3: 8,
      phase4: 16,
      phase5: 32,
      phase6: 64,
      phase7: 128,
    };

    const result: Phases = {};

    for (let i = 1; i <= numRounds; i++) {
      result[`phase${i}`] = phases[`phase${i}`];
    }

    if (totalPhase?.randomMatchs) {
      result[`phase${numRounds + 1}`];
    }

    return { result, totalPhaseMatchs };
  }

  private randomizeTeams(teams: TeamHelper[]): string[] {
    if (teams.length === 0) {
      return [];
    }

    const shuffledTeams = [...teams];
    const randomizedTeamNames: string[] = [];

    this.shuffleArray(shuffledTeams);
    shuffledTeams.map(team => {
      randomizedTeamNames.push(team.name);
    });

    return randomizedTeamNames;
  }

  private shuffleArray(array: TeamHelper[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private divideTeamsForPhases(
    teams: string[],
    randomMatchs: number
  ): { randomTeams: string[]; remainingTeams: string[] } {
    const randomTeams = teams.slice(0, randomMatchs);
    const remainingTeams = teams.slice(randomMatchs);

    return { randomTeams, remainingTeams };
  }

  private namePhaseAndNumberMatches(
    result: Phases,
    totalPhaseMatchs: Phases
  ): Phases[] {
    const nameAndNumberByPhase: Phases[] = [];

    for (const phase in result) {
      const totalMatchs = totalPhaseMatchs[phase];
      nameAndNumberByPhase.push({
        phase: result[phase],
        number: totalMatchs,
      });
    }

    return nameAndNumberByPhase;
  }

  private defineOtherMatches(
    result: Phases,
    totalPhaseMatchs: Phases
  ): Phases[] {
    const phases: Phases[] = this.namePhaseAndNumberMatches(
      result,
      totalPhaseMatchs
    );

    const matchesByPhase: Phases[] = [];

    phases.forEach((phaseObj: any) => {
      for (let j = 0; j < phaseObj.number / 2; j++) {
        const match = {
          team1: 'En attente',
          team2: 'En attente',
          phase: phaseObj.phase,
        };
        matchesByPhase.push(match);
      }
    });

    return matchesByPhase;
  }

  private definePhaseMatches(result: any): object {
    const defineMatches: any = {};
    defineMatches.randomPhaseMatches = [];

    for (let i = 0; i < result.matchsPhase.randomTeams.length; i += 2) {
      const match = {
        team1: result.matchsPhase.randomTeams[i],
        team2: result.matchsPhase.randomTeams[i + 1],
        phase: 'Phase préliminaire',
      };
      defineMatches.randomPhaseMatches.push(match);
    }

    const values = Object.values(result.totalPhase.result);
    const phase = values[values.length - 1];
    const phaseNumber = Object.keys(result.totalPhase.result)[
      Object.keys(result.totalPhase.result).length - 1
    ];

    const totalPhaseMatchs = result.totalPhase.totalPhaseMatchs[phaseNumber];

    defineMatches.remainingPhaseMatches = [];
    for (let i = 0; i < result.matchsPhase.remainingTeams.length; i += 2) {
      const team2 =
        result.matchsPhase.remainingTeams[i + 1] === undefined
          ? 'En attente'
          : result.matchsPhase.remainingTeams[i + 1];
      const match = {
        team1: result.matchsPhase.remainingTeams[i],
        team2: team2,
        phase: phase,
      };
      defineMatches.remainingPhaseMatches.push(match);
    }

    if (defineMatches.remainingPhaseMatches.length < totalPhaseMatchs / 2) {
      for (
        let i = defineMatches.remainingPhaseMatches.length;
        i < totalPhaseMatchs / 2;
        i++
      ) {
        const match = {
          team1: 'En attente',
          team2: 'En attente',
          phase: phase,
        };
        defineMatches.remainingPhaseMatches.push(match);
      }
    }

    const keysResult = Object.keys(result.totalPhase.result);
    const lastKeyResult = keysResult[keysResult.length - 1];

    const { [lastKeyResult]: phaseResult, ...restResult } =
      result.totalPhase.result;

    defineMatches.otherMatches;
    defineMatches.otherMatches = this.defineOtherMatches(
      restResult,
      result.totalPhase.totalPhaseMatchs
    );

    return defineMatches;
  }

  generatedTree(totalTeams: number, teams: any): any {
    const result: IGeneratedTreeResultService = {
      calculPhase: this.calculPhase(totalTeams),
      totalPhase: this.convertToTournamentPhase(this.calculPhase(totalTeams)),
      randomizeTeams: this.randomizeTeams(teams),
      matchsPhase: this.divideTeamsForPhases(
        this.randomizeTeams(teams),
        this.calculPhase(totalTeams).randomMatchs
      ),
    };

    return this.definePhaseMatches(result);
  }
}
