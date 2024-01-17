import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperTournamentService {
  calculPhase(totalTeams: number) {
    let c = 1;
    let randomMatchs;
    let a;
    while (totalTeams / (c * 2)) {
      c *= 2;
      a = Math.floor(totalTeams / c);
      randomMatchs = totalTeams % c;
    }

    console.log('nombre de poule', c, 'random', randomMatchs);
  }

  convertToTournamentPhase(totalTeams: number): string {
    let numRounds = 0;
    let teamsRemaining = totalTeams;

    while (teamsRemaining > 1) {
      teamsRemaining /= 2;
      numRounds++;
    }
    switch (numRounds) {
      case 0:
        return 'Finale';
      case 1:
        return 'Demi-finale';
      case 2:
        return 'Quart de finale';
      case 3:
        return 'Huitièmes de finale';
      case 4:
        return 'Seizièmes de finale';
      case 5:
        return 'Phase préliminaire';
      case 6:
        return 'Phase de préqualification';
      default:
        return `Tour ${numRounds}`;
    }
  }
}
