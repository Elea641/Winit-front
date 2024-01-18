import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperTournamentService {
  calculPhase(totalTeams: number) {
    let count = 1;
    let randomMatchs = 0;
    let a;
    let totalMatchesWithoutRandoms = 0;
    while (Math.floor(totalTeams / (count * 2))) {
      count *= 2;
      a = Math.floor(totalTeams / count);
      randomMatchs = totalTeams % count;
    }

    totalMatchesWithoutRandoms = totalTeams - randomMatchs;

    return { count, randomMatchs, totalMatchesWithoutRandoms };
  }

  convertToTournamentPhase(totalPhase: any): object {
    let numRounds = 0;
    let teamsRemaining = totalPhase.count;

    while (teamsRemaining > 1) {
      teamsRemaining /= 2;
      numRounds++;
    }

    const phases: any = {
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

    const result: any = {};

    for (let i = 1; i <= numRounds; i++) {
      result[`phase${i}`] = phases[`phase${i}`];
    }

    if (totalPhase?.randomMatchs > 0) {
      result[`phase${numRounds + 1}`];
    } else {
      result[`phase${numRounds + 1}`];
    }

    return { result, totalPhaseMatchs };
  }
}
