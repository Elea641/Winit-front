import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperTournamentService {
  calculPhase(totalTeams: number) {
    let c = 1;
    let randomMatchs = 0;
    let a;
    while (Math.floor(totalTeams / (c * 2))) {
      c *= 2;
      a = Math.floor(totalTeams / c);
      randomMatchs = totalTeams % c;
    }
    return { c, randomMatchs };
  }

  convertToTournamentPhase(totalPhase: any): object {
    let numRounds = 0;
    let teamsRemaining = totalPhase.c;

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
      phase8: 'Phase de préqualification aléatoire',
    };

    const result: any = {};

    for (let i = 1; i <= numRounds; i++) {
      result[`phase${i}`] = phases[`phase${i}`];
    }

    if (totalPhase?.randomMatchs > 0) {
      result[`phase${numRounds + 1}`];
      result[`phase${numRounds + 2}`] = 'Phase de préqualification aléatoire';
    } else {
      result[`phase${numRounds + 1}`];
    }

    return result;
  }
}
