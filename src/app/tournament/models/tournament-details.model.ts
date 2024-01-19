export class TournamentDetails {
  constructor(
    public name: string,
    public sport: string,
    public city: string,
    public participants: number,
    public teams: { team: string; result: number; url: string }[]
  ) {}
}
