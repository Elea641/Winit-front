export class MatchUpdate {
  constructor(
    public id: number,
    public tournamentId: number,
    public scoreTeam1: number,
    public scoreTeam2: number,
    public nextTeamInfo: { id: number | undefined; team: string | undefined }
  ) {}
}
