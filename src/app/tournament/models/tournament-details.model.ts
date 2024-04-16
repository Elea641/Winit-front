export class TournamentDetails {
  constructor(
    public sport: string,
    public place: string,
    public participants: number,
    public maxNumberOfTeams: number,
    public name: string,
    public date: Date,
    public inscriptionLimitDate: Date,
    public createdAt: Date,
    public currentNumberOfParticipants: number | null,
    public format: string,
    public imageUrl: string,
    public privacy: string,
    public teams: { name: string; result: number; url: string }[]
  ) {}
}
