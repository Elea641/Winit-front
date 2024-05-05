export type ScoreModalContentType = {
  match: any;
  nextPhase: string;
  nextTeamInfo: any;
};

export class ScoreModalContent {
  match: any;
  nextPhase: string;
  nextTeamInfo: any;

  constructor(scoreModalContent: ScoreModalContentType) {
    this.match = scoreModalContent.match;
    this.nextPhase = scoreModalContent.nextPhase;
    this.nextTeamInfo = scoreModalContent.nextTeamInfo;
  }
}
