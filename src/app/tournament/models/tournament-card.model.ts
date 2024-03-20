export class TournamentCard {
  constructor(
    public id: number,
    public name: string,
    public date: Date,
    public imageUrl: string,
    public place: string,
    public currentNumberOfParticipants: number,
    public maxNumberOfTeams: number,
    public sport: string
  ) {}
}
