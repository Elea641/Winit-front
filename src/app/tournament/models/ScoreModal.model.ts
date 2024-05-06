export type ScoreModalContentType = {
  match: any;
  nextPhase: string;
  nextTeamInfo: any;
  tournamentId: number;
};

export class ScoreModalContent {
  match: any;
  nextPhase: string;
  nextTeamInfo: any;
  tournamentId: number;

  constructor(scoreModalContent: ScoreModalContentType) {
    this.match = scoreModalContent.match;
    this.nextPhase = scoreModalContent.nextPhase;
    this.nextTeamInfo = scoreModalContent.nextTeamInfo;
    this.tournamentId = scoreModalContent.tournamentId;
  }
}
