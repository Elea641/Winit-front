export class Match {
  constructor(
    public id: number,
    public loserTeamId: number,
    public winnerTeamId: number,
    public phase: string,
    public scoreTeam1: number,
    public scoreTeam2: number,
    public team1: string,
    public team2: string
  ) {}
}
