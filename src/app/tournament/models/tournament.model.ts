export class Tournament {
  constructor(
    public id: number,
    public name: string,
    public date: string,
    public place: string,
    public sport: string,
    public playersPerTeam: number,
    public maxPlayers: number,
    public minTeams: number,
    public maxTeams: number,
    public gameLength: number,
    public privacy: string,
    public playerCategory: string,
    public tournamentFormat: string,
    public tournamentBanner?: string,
    public inscriptionLimitDate?: Date,
    public currentPlayers?: number
  ) {}
}
