export class TopWinnerTeamDto {
  constructor(
    public id: number,
    public name: string,
    public sportId: string,
    public ownerId: number,
    public tournamentName: string
  ) {}
}
