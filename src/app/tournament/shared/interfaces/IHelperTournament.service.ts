export interface IHelperTournamentService {
  calculPhase(totalTeams: number): void;
  generatedTree(totalTeams: number, teams: any): any;
}
